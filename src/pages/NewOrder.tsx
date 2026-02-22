import React, { useState } from 'react';
import { ShoppingBag, Search, Plus, Trash2, Printer, ChevronDown } from 'lucide-react';

type ProductCategory = 'Quadros Decorativos' | 'Espelhos' | 'Móveis';

interface OrderItem {
    id: string;
    category: ProductCategory;
    description: string;
    size?: string;
    frame?: string;
    finish?: string;
    price: number;
}

export const NewOrder: React.FC = () => {
    const [clientName, setClientName] = useState('');
    const [items, setItems] = useState<OrderItem[]>([]);

    // States for adding a new item
    const [category, setCategory] = useState<ProductCategory>('Quadros Decorativos');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [frame, setFrame] = useState('');
    const [finish, setFinish] = useState('');
    const [price, setPrice] = useState<string>('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !price) return;

        const newItem: OrderItem = {
            id: Math.random().toString(36).substr(2, 9),
            category,
            description,
            size: category === 'Quadros Decorativos' || category === 'Espelhos' ? size : undefined,
            frame: category === 'Quadros Decorativos' ? frame : undefined,
            finish: category === 'Quadros Decorativos' ? finish : undefined,
            price: parseFloat(price.replace(',', '.')),
        };

        setItems([...items, newItem]);

        // Reset fields
        setDescription('');
        setSize('');
        setFrame('');
        setFinish('');
        setPrice('');
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center print:hidden">
                <div>
                    <h2 className="text-3xl font-display text-white">Novo Pedido / Orçamento</h2>
                    <p className="text-zinc-500 mt-1">Crie um pedido facilmente para o seu cliente lojista.</p>
                </div>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition-all rounded-xl font-bold text-xs uppercase tracking-widest"
                >
                    <Printer size={16} />
                    Imprimir Orçamento
                </button>
            </div>

            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative">
                <div className="space-y-6">
                    <h3 className="text-lg font-display text-white border-b border-white/5 pb-4">1. Dados do Cliente</h3>
                    <div className="max-w-md">
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                            Nome do Lojista / Empresa
                        </label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Ex: Decor Prime, Maison Zara..."
                                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl print:hidden">
                <h3 className="text-lg font-display text-white border-b border-white/5 pb-4 mb-6">2. Adicionar Produtos</h3>

                <form onSubmit={handleAddItem} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                Categoria do Produto
                            </label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all appearance-none"
                                >
                                    <option value="Quadros Decorativos" className="bg-brand-dark text-white">Quadros Decorativos</option>
                                    <option value="Espelhos" className="bg-brand-dark text-white">Espelhos</option>
                                    <option value="Móveis" className="bg-brand-dark text-white">Móveis</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                Descrição do Produto *
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Quadro Leão Preto e Branco, Mesa de Centro..."
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                            />
                        </div>

                        {(category === 'Quadros Decorativos' || category === 'Espelhos') && (
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                    Tamanho (L x A)
                                </label>
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    placeholder="Ex: 100x150cm"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                                />
                            </div>
                        )}

                        {category === 'Quadros Decorativos' && (
                            <>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                        Moldura
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={frame}
                                            onChange={(e) => setFrame(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all appearance-none"
                                        >
                                            <option value="" className="bg-brand-dark text-white">Selecione uma opção</option>
                                            <option value="Caixa Branca" className="bg-brand-dark text-white">Caixa Branca</option>
                                            <option value="Caixa Preta" className="bg-brand-dark text-white">Caixa Preta</option>
                                            <option value="Caixa Madeira" className="bg-brand-dark text-white">Caixa Madeira</option>
                                            <option value="Borda Infinita" className="bg-brand-dark text-white">Borda Infinita</option>
                                            <option value="Filete Dourado" className="bg-brand-dark text-white">Filete Dourado</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                        Acabamento
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={finish}
                                            onChange={(e) => setFinish(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all appearance-none"
                                        >
                                            <option value="" className="bg-brand-dark text-white">Selecione uma opção</option>
                                            <option value="Com Vidro Cristal" className="bg-brand-dark text-white">Com Vidro Cristal</option>
                                            <option value="Com Vidro Antirreflexo" className="bg-brand-dark text-white">Com Vidro Antirreflexo</option>
                                            <option value="Em Tela / Canvas (Sem Vidro)" className="bg-brand-dark text-white">Em Tela / Canvas (Sem Vidro)</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
                                Preço Unitário de Venda *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-white text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-brand-gold transition-all rounded-xl font-bold text-xs uppercase tracking-widest"
                        >
                            <Plus size={16} />
                            Adicionar Produto
                        </button>
                    </div>
                </form>
            </div>

            {/* Tabela de Itens (visível na tela e na impressão) */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden print:border-none print:shadow-none print:p-0">
                <div className="p-8 border-b border-white/5 print:hidden">
                    <h3 className="text-lg font-display text-white">Resumo do Pedido</h3>
                </div>

                {/* Print Header */}
                <div className="hidden print:block p-8 border-b border-zinc-200">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-display text-black italic">Casa Linda Black Label</h2>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Orçamento Comercial</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Data: {new Date().toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>
                    <div className="bg-zinc-100 p-6 rounded-xl">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Cliente / Lojista</p>
                        <p className="text-lg font-display text-black">{clientName || 'Não informado'}</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="p-12 text-center print:hidden">
                        <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500 text-sm">Nenhum produto adicionado ao orçamento ainda.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 print:border-zinc-200 text-[10px] uppercase tracking-widest text-zinc-500 print:text-zinc-500">
                                    <th className="px-8 py-4 font-bold">Produto</th>
                                    <th className="px-8 py-4 font-bold">Especificações</th>
                                    <th className="px-8 py-4 font-bold text-right">Preço</th>
                                    <th className="px-8 py-4 font-bold text-center print:hidden">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 print:divide-zinc-200">
                                {items.map((item, index) => (
                                    <tr key={item.id} className="group hover:bg-white/[0.02] print:hover:bg-transparent transition-colors">
                                        <td className="px-8 py-6 align-top">
                                            <div className="font-bold text-white print:text-black mb-1">{item.description}</div>
                                            <div className="text-[10px] uppercase tracking-wider text-brand-gold print:text-zinc-500">{item.category}</div>
                                        </td>
                                        <td className="px-8 py-6 align-top text-sm">
                                            <ul className="space-y-1 text-zinc-400 print:text-zinc-600">
                                                {item.size && <li><span className="text-zinc-500 print:text-zinc-400">Tam:</span> {item.size}</li>}
                                                {item.frame && <li><span className="text-zinc-500 print:text-zinc-400">Moldura:</span> {item.frame}</li>}
                                                {item.finish && <li><span className="text-zinc-500 print:text-zinc-400">Acabamento:</span> {item.finish}</li>}
                                                {!item.size && !item.frame && !item.finish && <li className="italic">Nenhuma especificação</li>}
                                            </ul>
                                        </td>
                                        <td className="px-8 py-6 align-top text-right font-bold text-white print:text-black whitespace-nowrap">
                                            {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-8 py-6 align-top text-center print:hidden">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all mx-auto"
                                                title="Remover"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-black/50 print:bg-zinc-50">
                                    <td colSpan={2} className="px-8 py-6 text-right text-sm uppercase tracking-widest text-zinc-500 font-bold">
                                        Total Estimado
                                    </td>
                                    <td className="px-8 py-6 text-right font-display text-2xl text-brand-gold print:text-black">
                                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="print:hidden"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>

            {/* Print Footer */}
            <div className="hidden print:block pt-12 text-center text-[10px] text-zinc-400 uppercase tracking-widest">
                <p>Validade deste orçamento: 15 dias.</p>
                <p className="mt-2">Casa Linda Decorações - O maior acervo de quadros e espelhos do Brasil.</p>
            </div>

            <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .bg-brand-dark {
            background-color: white !important;
          }
           * {
             color: black !important;
           }
           .text-brand-gold {
             color: #666 !important;
           }
           .border-white\\/5 {
              border-color: #eee !important;
           }
        }
      `}</style>
        </div>
    );
};
