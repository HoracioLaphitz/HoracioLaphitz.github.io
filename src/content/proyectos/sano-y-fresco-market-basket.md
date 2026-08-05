---
title: "SanoYFresco — Market Basket Analysis en Retail"
description: "4.9M+ transacciones de un retailer orgánico y cero insights accionables. Apliqué Market Basket Analysis con Apriori para descubrir qué productos se compran juntos y convertirlo en decisiones de layout y cross-selling, con un potencial de +15-20% en ticket promedio."
pubDate: 2025-07-29
category: "Análisis de datos"
tags: ["Python", "SQL", "Market Basket Analysis", "Apriori", "Power BI", "Pandas", "mlxtend"]
github: "https://github.com/HoracioLaphitz/MarketBasketAnalytics"
featured: true
draft: false
impact:
  revenueIncrease: "+15-20% ticket promedio"
  customMetrics:
    "Transacciones analizadas": "4.9M+"
    "Reglas de asociación": "50+"
    "Lift máximo": "2.3x"
resources:
  notebooks:
    - name: "Market Basket Analysis"
      path: "/Proyectos/Proyecto SanoYFresco/Notebooks/MarketBasketAnalysis.ipynb"
  pdfs:
    - name: "Documento de Requerimientos Funcionales de Negocio"
      path: "/Proyectos/Proyecto SanoYFresco/plantillas/Documento de Requerimientos Funcionales de Negocio.docx"
      description: "Requerimientos de negocio que enmarcaron el análisis: objetivos, alcance y criterios de éxito."
    - name: "Informe de Conclusiones"
      path: "/Proyectos/Proyecto SanoYFresco/plantillas/Informe de Conclusiones.docx"
      description: "Conclusiones ejecutivas del análisis con recomendaciones accionables para el negocio."
    - name: "Trabajo de Análisis de Insights"
      path: "/Proyectos/Proyecto SanoYFresco/plantillas/Trabajo de Analisis de Insights.xlsx"
      description: "Matriz de insights derivados de las reglas de asociación, priorizados por impacto."
  datasets:
    - name: "Reglas de asociación (CSV)"
      path: "/Proyectos/Proyecto SanoYFresco/Datos en si/reglas.csv"
      description: "50+ reglas de asociación minadas con Apriori: soporte, confianza y lift por combinación de productos."
---

## Situación

SanoYFresco es un retailer de productos orgánicos con un volumen enorme de operación: **4.975.718 transacciones** durante todo 2023, **206.209 clientes únicos** y **49.688 productos**. Toda esa data existía, pero no se estaba usando para decidir nada.

## El desafío

Dos problemas concretos de negocio:

1. La ubicación de productos complementarios en tienda era poco efectiva.
2. Había oportunidades de venta cruzada (*cross-selling*) que nadie había identificado.

La pregunta de fondo: **¿qué productos se compran juntos y cómo lo aprovechamos para subir el ticket promedio?**

## La solución

Un pipeline de análisis de canasta de mercado end-to-end:

- **Extracción y preparación** — carga de una base SQLite con 5M+ registros, limpieza y estructuración transaccional con Pandas.
- **Market Basket Analysis** — algoritmo **Apriori** (mlxtend) para minar reglas de asociación, midiendo soporte, confianza y *lift*. Filtré por confianza > 60% y lift > 1.5.
- **Análisis de patrones** — productos ancla, asociaciones fuertes entre categorías y segmentación temporal por hora del día.

## Impacto

- **50+ reglas de asociación** accionables (ej: bananas orgánicas → aguacates, lift 2.3x; panadería → lácteos orgánicos, lift 1.8x).
- Potencial de **+15-20% en ticket promedio** mediante *bundling* estratégico.
- Layout optimizado y dos dashboards en Power BI (ventas y marketing) para bajar los insights a decisiones diarias.

### Dashboard de Ventas

![Dashboard de Ventas en Power BI](/Proyectos/Proyecto%20SanoYFresco/DASHVentas.jpg)

### Dashboard de Marketing

![Dashboard de Marketing en Power BI](/Proyectos/Proyecto%20SanoYFresco/DashMarketing.jpg)
