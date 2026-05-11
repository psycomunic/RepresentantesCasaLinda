import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  format?: string;
  size?: string;
  frame?: string;
  finish?: string;
  quantity: number;
  price: number;
  imageBase64?: string; // data URL (base64)
}

interface BudgetPDFProps {
  clientName: string;
  items: BudgetItem[];
  date: string;
}

const GOLD = '#C5A059';
const BLACK = '#0A0A0A';
const GRAY_LIGHT = '#F5F5F5';
const GRAY_MID = '#9CA3AF';
const GRAY_DARK = '#374151';
const WHITE = '#FFFFFF';
const BORDER = '#E5E7EB';

const styles = StyleSheet.create({
  page: {
    backgroundColor: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: BLACK,
  },

  // ── CAPA ────────────────────────────────────────────────────────────────────
  coverPage: {
    backgroundColor: BLACK,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  coverTop: {
    padding: 56,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverBrand: {
    color: GOLD,
    fontFamily: 'Times-Roman',
    fontSize: 36,
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  coverTagline: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 9,
    letterSpacing: 4,
    textTransform: 'uppercase',
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 40,
  },
  coverDivider: {
    width: 60,
    height: 1,
    backgroundColor: GOLD,
    opacity: 0.5,
    marginBottom: 40,
  },
  coverDocLabel: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 10,
    letterSpacing: 5,
    textTransform: 'uppercase',
    opacity: 0.4,
    textAlign: 'center',
    marginBottom: 16,
  },
  coverDocTitle: {
    color: WHITE,
    fontFamily: 'Times-Roman',
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
  },
  coverBottom: {
    padding: 32,
    paddingHorizontal: 56,
    borderTop: `1px solid ${GOLD}22`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  coverBottomLabel: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  coverBottomValue: {
    color: WHITE,
    fontFamily: 'Times-Roman',
    fontSize: 13,
  },

  // ── HEADER (páginas internas) ───────────────────────────────────────────────
  header: {
    backgroundColor: BLACK,
    paddingHorizontal: 40,
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBrand: {
    color: GOLD,
    fontFamily: 'Times-Roman',
    fontSize: 14,
    letterSpacing: 3,
  },
  headerLabel: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },

  // ── CORPO ────────────────────────────────────────────────────────────────────
  body: {
    padding: 40,
    paddingTop: 28,
    flex: 1,
  },

  // Info do cliente
  clientBox: {
    backgroundColor: GRAY_LIGHT,
    borderRadius: 6,
    padding: 16,
    marginBottom: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  clientLabel: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  clientName: {
    color: BLACK,
    fontFamily: 'Times-Roman',
    fontSize: 16,
  },
  dateLabel: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
    textAlign: 'right',
  },
  dateValue: {
    color: GRAY_DARK,
    fontFamily: 'Helvetica',
    fontSize: 9,
    textAlign: 'right',
  },

  // Tabela
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `2px solid ${GOLD}`,
    paddingBottom: 8,
    marginBottom: 0,
  },
  colImg: { width: 52 },
  colDesc: { flex: 1, paddingRight: 8 },
  colSpecs: { width: 140, paddingRight: 8 },
  colQty: { width: 36, textAlign: 'center' },
  colUnit: { width: 64, textAlign: 'right' },
  colTotal: { width: 72, textAlign: 'right' },

  tableHeaderText: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Linhas da tabela
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `1px solid ${BORDER}`,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  tableRowAlt: {
    backgroundColor: '#FAFAFA',
  },
  itemImageBox: {
    width: 44,
    height: 44,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 4,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 44,
    height: 44,
    objectFit: 'cover',
  },
  noImageBox: {
    width: 44,
    height: 44,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 6,
    textAlign: 'center',
  },
  itemCategory: {
    color: GOLD,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  itemDesc: {
    color: BLACK,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.2,
    marginBottom: 3,
  },
  specItem: {
    color: GRAY_DARK,
    fontFamily: 'Helvetica',
    fontSize: 8,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  specLabel: {
    color: GRAY_MID,
  },
  cellQty: {
    color: BLACK,
    fontFamily: 'Helvetica',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cellPrice: {
    color: GRAY_DARK,
    fontFamily: 'Helvetica',
    fontSize: 9,
    textAlign: 'right',
  },
  cellTotal: {
    color: BLACK,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },

  // Totalizador
  totalsBox: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalsInner: {
    width: 200,
  },
  totalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottom: `1px solid ${BORDER}`,
  },
  totalLabel: {
    color: GRAY_DARK,
    fontFamily: 'Helvetica',
    fontSize: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  totalValue: {
    color: BLACK,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  grandTotalRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 4,
  },
  grandTotalLabel: {
    color: GOLD,
    fontFamily: 'Helvetica',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  grandTotalValue: {
    color: GOLD,
    fontFamily: 'Times-Roman',
    fontSize: 18,
  },

  // Rodapé
  footer: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderTop: `1px solid ${BORDER}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
    letterSpacing: 1,
  },
  footerPageNum: {
    color: GRAY_MID,
    fontFamily: 'Helvetica',
    fontSize: 7,
  },
});

function formatCurrency(val: number): string {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const ITEMS_PAGE_ONE = 7;
const ITEMS_PER_PAGE = 12;

export const BudgetPDF: React.FC<BudgetPDFProps> = ({ clientName, items, date }) => {
  const grandTotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  // Chunk items across pages
  const pages: BudgetItem[][] = [];
  pages.push(items.slice(0, ITEMS_PAGE_ONE));
  let offset = ITEMS_PAGE_ONE;
  while (offset < items.length) {
    pages.push(items.slice(offset, offset + ITEMS_PER_PAGE));
    offset += ITEMS_PER_PAGE;
  }

  const tableHeaderRow = (
    <View style={styles.tableHeader}>
      <View style={styles.colImg} />
      <View style={styles.colDesc}>
        <Text style={styles.tableHeaderText}>Produto</Text>
      </View>
      <View style={styles.colSpecs}>
        <Text style={styles.tableHeaderText}>Especificações</Text>
      </View>
      <View style={styles.colQty}>
        <Text style={[styles.tableHeaderText, { textAlign: 'center' }]}>Qtd</Text>
      </View>
      <View style={styles.colUnit}>
        <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Unit.</Text>
      </View>
      <View style={styles.colTotal}>
        <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Total</Text>
      </View>
    </View>
  );

  return (
    <Document title={`Orçamento - ${clientName || 'Cliente'}`} author="Casa Linda Decorações">
      {/* ── CAPA ─────────────────────────────────────────────────────── */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverTop}>
          <Text style={styles.coverBrand}>CASA LINDA</Text>
          <Text style={styles.coverTagline}>Decorações Exclusivas</Text>
          <View style={styles.coverDivider} />
          <Text style={styles.coverDocLabel}>Documento Comercial</Text>
          <Text style={styles.coverDocTitle}>Orçamento / Proposta</Text>
        </View>
        <View style={styles.coverBottom}>
          <View>
            <Text style={styles.coverBottomLabel}>Cliente</Text>
            <Text style={styles.coverBottomValue}>{clientName || '—'}</Text>
          </View>
          <View>
            <Text style={[styles.coverBottomLabel, { textAlign: 'right' }]}>Data</Text>
            <Text style={[styles.coverBottomValue, { textAlign: 'right' }]}>{date}</Text>
          </View>
        </View>
      </Page>

      {/* ── PÁGINAS DE ITENS ─────────────────────────────────────────── */}
      {pages.map((pageItems, pageIndex) => {
        const isFirst = pageIndex === 0;
        const isLast = pageIndex === pages.length - 1;

        return (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerBrand}>CASA LINDA</Text>
              <Text style={styles.headerLabel}>Orçamento Comercial</Text>
            </View>

            <View style={styles.body}>
              {/* Info do cliente apenas na primeira página */}
              {isFirst && (
                <View style={styles.clientBox}>
                  <View>
                    <Text style={styles.clientLabel}>Cliente / Lojista</Text>
                    <Text style={styles.clientName}>{clientName || 'Não informado'}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLabel}>Data do Orçamento</Text>
                    <Text style={styles.dateValue}>{date}</Text>
                  </View>
                </View>
              )}

              {/* Tabela */}
              {tableHeaderRow}

              {pageItems.map((item, idx) => {
                const lineTotal = item.price * item.quantity;
                const isAlt = idx % 2 !== 0;
                return (
                  <View key={item.id} style={[styles.tableRow, isAlt ? styles.tableRowAlt : {}]}>
                    {/* Imagem */}
                    <View style={styles.colImg}>
                      {item.imageBase64 ? (
                        <View style={styles.itemImageBox}>
                          <Image src={item.imageBase64} style={styles.itemImage} />
                        </View>
                      ) : (
                        <View style={styles.noImageBox}>
                          <Text style={styles.noImageText}>Sem{'\n'}img</Text>
                        </View>
                      )}
                    </View>

                    {/* Descrição */}
                    <View style={styles.colDesc}>
                      <Text style={styles.itemCategory}>{item.category}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>

                    {/* Specs */}
                    <View style={styles.colSpecs}>
                      {item.format && (
                        <Text style={styles.specItem}>
                          <Text style={styles.specLabel}>Formato: </Text>
                          {item.format}
                        </Text>
                      )}
                      {item.size && (
                        <Text style={styles.specItem}>
                          <Text style={styles.specLabel}>Tam: </Text>
                          {item.size}
                        </Text>
                      )}
                      {item.frame && (
                        <Text style={styles.specItem}>
                          <Text style={styles.specLabel}>Moldura: </Text>
                          {item.frame}
                        </Text>
                      )}
                      {item.finish && (
                        <Text style={styles.specItem}>
                          <Text style={styles.specLabel}>Acabamento: </Text>
                          {item.finish}
                        </Text>
                      )}
                      {!item.format && !item.size && !item.frame && !item.finish && (
                        <Text style={styles.specItem}>—</Text>
                      )}
                    </View>

                    {/* Qtd */}
                    <View style={styles.colQty}>
                      <Text style={styles.cellQty}>{item.quantity}</Text>
                    </View>

                    {/* Unit */}
                    <View style={styles.colUnit}>
                      <Text style={styles.cellPrice}>{formatCurrency(item.price)}</Text>
                    </View>

                    {/* Total linha */}
                    <View style={styles.colTotal}>
                      <Text style={styles.cellTotal}>{formatCurrency(lineTotal)}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Totalizador apenas na última página */}
              {isLast && (
                <View style={styles.totalsBox}>
                  <View style={styles.totalsInner}>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>Itens</Text>
                      <Text style={styles.totalValue}>{totalItems} un.</Text>
                    </View>
                    <View style={styles.grandTotalRow}>
                      <Text style={styles.grandTotalLabel}>Total Estimado</Text>
                      <Text style={styles.grandTotalValue}>{formatCurrency(grandTotal)}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Validade: 15 dias · Casa Linda Decorações · O maior acervo de quadros do Brasil
              </Text>
              <Text style={styles.footerPageNum}>
                {pageIndex + 1} / {pages.length}
              </Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
