import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { Product } from '../types';

// O @react-pdf/renderer suporta fontes padrão como Helvetica e Times-Roman.
// Para garantir estabilidade e carregamento imediato sem problemas de CORS ou rede com TTFs externos,
// utilizaremos as fontes nativas com tracking e espaçamentos que simulam luxo (estilo editorial Vogue/Galeria).

const styles = StyleSheet.create({
  // Capa
  coverPage: {
    backgroundColor: '#050505',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    color: '#C5A059',
    fontFamily: 'Times-Roman',
    fontSize: 42,
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  coverSubtitle: {
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 4,
    opacity: 0.8,
  },
  coverYear: {
    color: '#C5A059',
    fontFamily: 'Times-Roman',
    fontSize: 14,
    marginTop: 60,
    letterSpacing: 2,
  },
  coverBorder: {
    position: 'absolute',
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    border: '1px solid #C5A059',
    opacity: 0.3,
  },

  // Páginas Internas (Fundo Claro/Minimalista)
  page: {
    backgroundColor: '#F8F9FA',
    padding: 40,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 40,
    right: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
  // Grid de Produtos (2 por página para dar respiro e foco nas imagens)
  productGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
    marginTop: 20,
  },
  productContainer: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
  },
  imageWrapper: {
    height: 300,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    border: '1px solid #F3F4F6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  productCategory: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#C5A059',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5,
  },
  productName: {
    fontFamily: 'Times-Roman',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  productSku: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#9CA3AF',
    marginBottom: 15,
  },
  priceContainer: {
    marginTop: 'auto',
    borderTop: '1px solid #F3F4F6',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceValue: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    color: '#C5A059',
  },

  // Rodapé
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageNumber: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#9CA3AF',
  },
  brandFooter: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#111827',
    letterSpacing: 1,
  }
});

interface CatalogPDFProps {
  products: Product[];
}

export const CatalogPDF: React.FC<CatalogPDFProps> = ({ products }) => {
  // Agrupa produtos 2 a 2 para criar as páginas
  const chunkedProducts: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    chunkedProducts.push(products.slice(i, i + 2));
  }

  return (
    <Document>
      {/* Capa */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverBorder} />
        <Text style={styles.coverTitle}>CASA LINDA</Text>
        <Text style={styles.coverSubtitle}>Decorações Exclusivas</Text>
        <Text style={styles.coverYear}>C O L E C T I O N  {new Date().getFullYear()}</Text>
      </Page>

      {/* Páginas de Produtos */}
      {chunkedProducts.map((pair, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Catálogo Exclusivo</Text>
            <Text style={styles.headerText}>Casa Linda Decorações</Text>
          </View>

          <View style={styles.productGrid}>
            {pair.map(product => (
              <View key={product.id} style={styles.productContainer}>
                <View style={styles.imageWrapper}>
                  {product.image_url ? (
                    <Image source={{ uri: product.image_url }} style={styles.productImage} />
                  ) : (
                    <Text style={{ fontFamily: 'Helvetica', fontSize: 10, color: '#D1D5DB' }}>Sem imagem</Text>
                  )}
                </View>
                <Text style={styles.productCategory}>{product.category || 'Decoração'}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSku}>SKU: {product.sku}</Text>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Preço Atacado</Text>
                  <Text style={styles.priceValue}>
                    R$ {product.wholesale_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.pageNumber}>{index + 1}</Text>
            <Text style={styles.brandFooter}>CASA LINDA</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};
