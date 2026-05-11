import React, { useState, useRef } from 'react';
import { ShoppingBag, Search, Plus, Trash2, Printer, ChevronDown, ImagePlus, Loader2, Send, CheckCircle } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { BudgetPDF, BudgetItem } from '../components/BudgetPDF';
import { supabase } from '../lib/supabase';

type ProductCategory = 'Quadros Decorativos' | 'Espelhos' | 'Móveis';

interface OrderItem {
    id: string;
    category: ProductCategory;
    description: string;
    format?: string;
    size?: string;
    frame?: string;
    finish?: string;
    quantity: number;
    price: number;
    imageUrl?: string;      // preview na tela
    imageBase64?: string;   // para o PDF
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export const NewOrder: React.FC = () => {
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState<OrderItem[]>([]);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedOrderId, setSavedOrderId] = useState<string | null>(null);

    // Form state
    const [category, setCategory] = useState<ProductCategory>('Quadros Decorativos');
    const [description, setDescription] = useState('');
    const [format, setFormat] = useState('');
    const [size, setSize] = useState('');
    const [frame, setFrame] = useState('');
    const [finish, setFinish] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [imageBase64, setImageBase64] = useState<string | undefined>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageUrl(URL.createObjectURL(file));
        const b64 = await fileToBase64(file);
        setImageBase64(b64);
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !price) return;

        const newItem: OrderItem = {
            id: Math.random().toString(36).substr(2, 9),
            category,
            description,
            format: category === 'Quadros Decorativos' ? format : undefined,
            size: category !== 'Móveis' ? size : undefined,
            frame: category !== 'Móveis' ? frame : undefined,
            finish: category !== 'Móveis' ? finish : undefined,
            quantity,
            price: parseFloat(price.replace(',', '.')),
            imageUrl,
            imageBase64,
        };

        setItems(prev => [...prev, newItem]);
        setDescription(''); setFormat(''); setSize('');
        setFrame(''); setFinish(''); setPrice('');
        setQuantity(1);
        setImageUrl(undefined); setImageBase64(undefined);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSaveOrder = async () => {
        if (items.length === 0) return;
        setSaving(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Não autenticado');

            const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

            // 1. Cria o pedido
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    representative_id: session.user.id,
                    client_name: clientName || 'Não informado',
                    total_amount: totalAmount,
                    status: 'pending',
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Cria os itens do pedido
            const orderItemsPayload = items.map(it => ({
                order_id: order.id,
                product_name: it.description,
                quantity: it.quantity,
                unit_price: it.price,
                image_url: it.imageBase64 || null,
                custom_details: {
                    category: it.category,
                    ...(it.format ? { format: it.format } : {}),
                    ...(it.size ? { size: it.size } : {}),
                    ...(it.frame ? { frame: it.frame } : {}),
                    ...(it.finish ? { finish: it.finish } : {}),
                },
            }));

            const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
            if (itemsError) throw itemsError;

            setSavedOrderId(order.id);
            alert(`✅ Pedido #${order.order_number || order.id.slice(0,8)} gerado com sucesso!\n\nEle já está na área "Meus Pedidos" com status Aguardando Aprovação.`);

            // Reset
            setClientName('');
            setItems([]);
            setSavedOrderId(null);
        } catch (err: any) {
            console.error('Erro ao salvar pedido:', err);
            alert('Erro ao gerar o pedido: ' + (err.message || 'Tente novamente.'));
        } finally {
            setSaving(false);
        }
    };

    const handlePrint = async () => {
        if (items.length === 0) return;
        setGenerating(true);
        try {
            const budgetItems: BudgetItem[] = items.map(it => ({
                id: it.id,
                category: it.category,
                description: it.description,
                format: it.format,
                size: it.size,
                frame: it.frame,
                finish: it.finish,
                quantity: it.quantity,
                price: it.price,
                imageBase64: it.imageBase64,
            }));
            const date = new Date().toLocaleDateString('pt-BR');
            const blob = await pdf(
                <BudgetPDF clientName={clientName} items={budgetItems} date={date} />
            ).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (err) {
            console.error('Erro ao gerar PDF:', err);
            alert('Erro ao gerar o PDF. Tente novamente.');
        } finally {
            setGenerating(false);
        }
    };

    const inputCls = "w-full px-4 py-3 bg-zinc-100 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-zinc-900 dark:text-white text-sm transition-all appearance-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600";
    const labelCls = "block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2";

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Título + Botão */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-display text-zinc-900 dark:text-white">Novo Pedido / Orçamento</h2>
                    <p className="text-zinc-500 mt-1">Crie um pedido facilmente para o seu cliente lojista.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        disabled={generating || items.length === 0}
                        className="flex items-center gap-2 px-5 py-3 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {generating ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
                        {generating ? 'Gerando...' : 'Orçamento PDF'}
                    </button>
                    <button
                        onClick={handleSaveOrder}
                        disabled={saving || items.length === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-black hover:bg-amber-500 transition-all rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        {saving ? 'Salvando...' : 'Gerar Pedido'}
                    </button>
                </div>
            </div>

            {/* Dados do Cliente */}
            <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 p-8 rounded-2xl shadow-sm dark:shadow-none">
                <h3 className="text-lg font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/5 pb-4 mb-6">1. Dados do Cliente</h3>
                <div className="max-w-md">
                    <label className={labelCls}>Nome do Lojista / Empresa</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={clientName}
                            onChange={e => setClientName(e.target.value)}
                            placeholder="Ex: Decor Prime, Maison Zara..."
                            className={`${inputCls} pl-11`}
                        />
                    </div>
                </div>
            </div>

            {/* Adicionar Produtos */}
            <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 p-8 rounded-2xl shadow-sm dark:shadow-none">
                <h3 className="text-lg font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/5 pb-4 mb-6">2. Adicionar Produtos</h3>

                <form onSubmit={handleAddItem} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Categoria */}
                        <div>
                            <label className={labelCls}>Categoria do Produto</label>
                            <div className="relative">
                                <select value={category} onChange={e => setCategory(e.target.value as ProductCategory)} className={inputCls}>
                                    <option value="Quadros Decorativos">Quadros Decorativos</option>
                                    <option value="Espelhos">Espelhos</option>
                                    <option value="Móveis">Móveis</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className={labelCls}>Descrição do Produto *</label>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                                placeholder="Ex: Quadro Leão Preto e Branco, Mesa de Centro..." required className={inputCls} />
                        </div>

                        {/* Formato (Quadros) */}
                        {category === 'Quadros Decorativos' && (
                            <div>
                                <label className={labelCls}>Formato do Quadro</label>
                                <div className="relative">
                                    <select value={format} onChange={e => { setFormat(e.target.value); setSize(''); }} className={inputCls}>
                                        <option value="">Selecione o formato</option>
                                        <option value="1 Tela Quadrado">1 Tela Quadrado</option>
                                        <option value="1 Tela">1 Tela</option>
                                        <option value="2 Telas">2 Telas</option>
                                        <option value="3 Telas">3 Telas</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {/* Tamanho (Quadros com formato) */}
                        {category === 'Quadros Decorativos' && format && (
                            <div>
                                <label className={labelCls}>Tamanho</label>
                                <div className="relative">
                                    <select value={size} onChange={e => setSize(e.target.value)} className={inputCls}>
                                        <option value="">Selecione o tamanho</option>
                                        {format === '1 Tela Quadrado' && ['85x85cm','115x115cm','145x145cm'].map(s => <option key={s} value={s}>{s}</option>)}
                                        {format === '1 Tela' && ['85x55cm','115x75cm','145x95cm','175x100cm'].map(s => <option key={s} value={s}>{s}</option>)}
                                        {format === '2 Telas' && ['55x35cm CADA','85x55cm CADA','115x75cm CADA','145x95cm CADA','175x95cm CADA'].map(s => <option key={s} value={s}>{s}</option>)}
                                        {format === '3 Telas' && ['40x20cm CADA','55x30cm CADA','70x40cm CADA','90x50cm CADA','120x70cm CADA'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {/* Tamanho (Espelhos) */}
                        {category === 'Espelhos' && (
                            <div>
                                <label className={labelCls}>Tamanho (L x A)</label>
                                <div className="relative">
                                    <select value={size} onChange={e => setSize(e.target.value)} className={inputCls}>
                                        <option value="">Selecione o tamanho</option>
                                        <option value="130x40cm">130x40cm</option>
                                        <option value="160x50cm">160x50cm</option>
                                        <option value="180x80cm">180x80cm</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {/* Moldura + Acabamento */}
                        {(category === 'Quadros Decorativos' || category === 'Espelhos') && (<>
                            <div>
                                <label className={labelCls}>Moldura</label>
                                <div className="relative">
                                    <select value={frame} onChange={e => setFrame(e.target.value)} className={inputCls}>
                                        <option value="">Selecione uma opção</option>
                                        <optgroup label="Sem Moldura"><option value="Sem Moldura (Borda Infinita)">Sem Moldura (Borda Infinita)</option></optgroup>
                                        <optgroup label="Caixa">
                                            {['Caixa Preta','Caixa Branca','Caixa Dourada','Caixa Madeira'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </optgroup>
                                        <optgroup label="Premium (Clássicas)">
                                            {['Trono de Ouro','Majestade Negra','Galeria Imperial'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </optgroup>
                                        <optgroup label="Premium (Luxo)">
                                            {['Roma Moderna','Palaciana','Realce Imperial','Imperial Prata e Ouro','Barroco Imperial'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </optgroup>
                                        <optgroup label="Flutuante / Canaleta">
                                            {['Flutuante Preta','Flutuante Branca','Flutuante Dourada','Flutuante Madeira'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </optgroup>
                                        <optgroup label="Côncava">
                                            {['Côncava Preta','Côncava Branca','Côncava Dourada','Côncava Madeira','Inox'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </optgroup>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Acabamento</label>
                                <div className="relative">
                                    <select value={finish} onChange={e => setFinish(e.target.value)} className={inputCls}>
                                        <option value="">Selecione uma opção</option>
                                        <option value="Sem Vidro">Sem Vidro</option>
                                        <option value="Com Vidro">Com Vidro</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>
                        </>)}

                        {/* Preço Unitário */}
                        <div>
                            <label className={labelCls}>Preço Unitário de Venda *</label>
                            <input type="number" step="0.01" min="0" value={price}
                                onChange={e => setPrice(e.target.value)} placeholder="0.00" required className={inputCls} />
                        </div>

                        {/* Quantidade */}
                        <div>
                            <label className={labelCls}>Quantidade</label>
                            <div className="flex items-center gap-3">
                                <button type="button"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-white hover:border-brand-gold hover:text-brand-gold transition-all text-lg font-bold"
                                >−</button>
                                <span className="w-16 text-center text-xl font-display font-bold text-zinc-900 dark:text-white tabular-nums">
                                    {quantity}
                                </span>
                                <button type="button"
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-white hover:border-brand-gold hover:text-brand-gold transition-all text-lg font-bold"
                                >+</button>
                                {price && (
                                    <span className="ml-2 text-sm text-zinc-500">
                                        = <span className="text-brand-gold font-bold">
                                            {(parseFloat(price.replace(',', '.') || '0') * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Upload de Imagem */}
                    <div>
                        <label className={labelCls}>Imagem do Quadro (opcional)</label>
                        <div className="flex items-center gap-4">
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-zinc-300 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-brand-gold hover:text-brand-gold transition-all text-sm font-medium"
                            >
                                <ImagePlus size={18} />
                                {imageUrl ? 'Trocar Imagem' : 'Adicionar Imagem'}
                            </button>
                            {imageUrl && (
                                <div className="flex items-center gap-3">
                                    <img src={imageUrl} alt="preview" className="w-16 h-16 object-cover rounded-xl border border-zinc-200 dark:border-white/10 shadow-sm" />
                                    <button type="button"
                                        onClick={() => { setImageUrl(undefined); setImageBase64(undefined); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                                    >Remover</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-brand-gold text-black hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-xl font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                        >
                            <Plus size={16} /> Adicionar Produto
                        </button>
                    </div>
                </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                <div className="p-8 border-b border-zinc-200 dark:border-white/5">
                    <h3 className="text-lg font-display text-zinc-900 dark:text-white">Resumo do Pedido</h3>
                </div>

                {items.length === 0 ? (
                    <div className="p-12 text-center">
                        <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500 text-sm">Nenhum produto adicionado ao orçamento ainda.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-200 dark:border-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
                                    <th className="px-6 py-4 font-bold w-16">Foto</th>
                                    <th className="px-4 py-4 font-bold">Produto</th>
                                    <th className="px-4 py-4 font-bold">Especificações</th>
                                    <th className="px-4 py-4 font-bold text-center">Qtd</th>
                                    <th className="px-4 py-4 font-bold text-right">Unit.</th>
                                    <th className="px-4 py-4 font-bold text-right">Total</th>
                                    <th className="px-4 py-4 font-bold text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                                {items.map(item => (
                                    <tr key={item.id} className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 align-middle">
                                            {item.imageUrl
                                                ? <img src={item.imageUrl} alt={item.description} className="w-12 h-12 object-cover rounded-lg border border-zinc-200 dark:border-white/10" />
                                                : <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center">
                                                    <ImagePlus size={16} className="text-zinc-400" />
                                                  </div>
                                            }
                                        </td>
                                        <td className="px-4 py-4 align-middle">
                                            <div className="font-bold text-zinc-900 dark:text-white text-sm">{item.description}</div>
                                            <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-1">{item.category}</div>
                                        </td>
                                        <td className="px-4 py-4 align-middle text-sm">
                                            <ul className="space-y-0.5 text-zinc-400">
                                                {item.format && <li><span className="text-zinc-500">Formato:</span> {item.format}</li>}
                                                {item.size && <li><span className="text-zinc-500">Tam:</span> {item.size}</li>}
                                                {item.frame && <li><span className="text-zinc-500">Moldura:</span> {item.frame}</li>}
                                                {item.finish && <li><span className="text-zinc-500">Acabamento:</span> {item.finish}</li>}
                                                {!item.format && !item.size && !item.frame && !item.finish && <li className="italic">—</li>}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-4 align-middle text-center">
                                            <span className="font-bold text-zinc-900 dark:text-white">{item.quantity}</span>
                                        </td>
                                        <td className="px-4 py-4 align-middle text-right text-sm text-zinc-500">
                                            {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-4 py-4 align-middle text-right font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                                            {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-4 py-4 align-middle text-center">
                                            <button onClick={() => removeItem(item.id)}
                                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all mx-auto"
                                                title="Remover"
                                            ><Trash2 size={15} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-zinc-50 dark:bg-black/50">
                                    <td colSpan={5} className="px-4 py-6 text-right text-sm uppercase tracking-widest text-zinc-500 font-bold">
                                        Total Estimado
                                    </td>
                                    <td className="px-4 py-6 text-right font-display text-2xl text-brand-gold">
                                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
