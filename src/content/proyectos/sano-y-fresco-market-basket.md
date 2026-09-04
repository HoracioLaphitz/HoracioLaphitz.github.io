---
title: "SanoYFresco — Análisis de canasta de mercado"
description: "Más de 4,9 millones de transacciones de un comercio de productos orgánicos. Apliqué el algoritmo Apriori para descubrir qué productos se compran juntos y orientar decisiones sobre su disposición y venta cruzada, con un potencial de mejora de entre el 15 % y el 20 % en el ticket promedio."
pubDate: 2025-07-29
category: "Análisis de datos"
tags: ["Python", "SQL", "Market Basket Analysis", "Apriori", "Power BI", "Pandas", "mlxtend"]
github: "https://github.com/HoracioLaphitz/MarketBasketAnalytics"
featured: true
showcase:
  context: "Más de 4,9 millones de transacciones de un comercio de productos orgánicos sin un análisis orientado a la toma de decisiones."
  contribution: "Análisis de canasta de mercado con Apriori y reglas de asociación filtradas por confianza superior al 60 % y lift mayor que 1,5."
  result: "Más de 50 reglas aplicables y un potencial de mejora de entre el 15 % y el 20 % en el ticket promedio."
  evidenceAction: "Ver notebook y recursos en GitHub"
draft: false
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
    - name: "Trabajo de análisis de hallazgos"
      path: "/Proyectos/Proyecto SanoYFresco/plantillas/Trabajo de Analisis de Insights.xlsx"
      description: "Matriz de hallazgos derivados de las reglas de asociación, priorizados por impacto."
---

## Situación

SanoYFresco es un comercio de productos orgánicos que registró **4.975.718 transacciones** durante 2023, **206.209 clientes únicos** y **49.688 productos**. Esos datos aún no se utilizaban para orientar decisiones.

## El desafío

Dos problemas concretos de negocio:

1. La ubicación de productos complementarios en tienda era poco efectiva.
2. Había oportunidades de venta cruzada que aún no se habían identificado.

La pregunta de fondo: **¿qué productos se compran juntos y cómo lo aprovechamos para subir el ticket promedio?**

## La solución

Un proceso completo de análisis de canasta de mercado:

- **Extracción y preparación** — carga de una base SQLite con más de 5 millones de registros, limpieza y estructuración transaccional con Pandas.
- **Análisis de canasta de mercado** — algoritmo **Apriori** (mlxtend) para obtener reglas de asociación y medir soporte, confianza y *lift*. Filtré las reglas con confianza superior al 60 % y *lift* mayor que 1,5.
- **Análisis de patrones** — productos ancla, asociaciones fuertes entre categorías y segmentación temporal por hora del día.

## Impacto

- **Más de 50 reglas de asociación** aplicables; por ejemplo, bananas orgánicas y aguacates, con un *lift* de 2,3, o panadería y lácteos orgánicos, con un *lift* de 1,8.
- Potencial de mejora de **entre el 15 % y el 20 % en el ticket promedio** mediante paquetes estratégicos.
- Disposición optimizada y dos tableros en Power BI —ventas y marketing— para convertir los hallazgos en decisiones diarias.

### Tablero de ventas

![Tablero de ventas en Power BI](/Proyectos/Proyecto%20SanoYFresco/DASHVentas.jpg)

### Tablero de marketing

![Tablero de marketing en Power BI](/Proyectos/Proyecto%20SanoYFresco/DashMarketing.jpg)
