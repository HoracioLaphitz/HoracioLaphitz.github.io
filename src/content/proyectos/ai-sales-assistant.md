---
title: "Ecommerce Analytics — ETL, App de Insights y Churn Prediction"
description: "Plataforma de analytics sobre 100k+ órdenes de Olist Brazil: ETL a un data mart en estrella, app de Streamlit con 6 tabs de insights y un modelo XGBoost que predice churn de vendedores con AUC-ROC 0.99."
pubDate: 2026-06-30
category: "Data Science"
tags: ["Python", "Streamlit", "XGBoost", "SQL", "ETL", "Churn Prediction", "Testing"]
github: "https://github.com/HoracioLaphitz/Data-Analysis-Ecommerce"
dashboard: "https://data-analysis-ecommerce-horaciolaphitz.streamlit.app/"
featured: true
showcase:
  context: "100k+ órdenes de Olist Brazil en tablas relacionales crudas, sin analytics accionable."
  contribution: "ETL a data mart en estrella, app Streamlit con 6 tabs de insights y modelo XGBoost para churn de vendedores."
  result: "AUC-ROC 0.99 en churn prediction, 2.433 vendedores analizados, app desplegada y usable."
  evidenceAction: "Ver app en vivo y código en GitHub"
draft: false
---

## El problema

El dataset Brazilian E-Commerce de Olist tiene 100k+ órdenes repartidas en tablas relacionales crudas. Dos preguntas de negocio guían el proyecto: ¿qué está pasando con las ventas, la logística y los clientes? y ¿qué vendedores están por abandonar la plataforma, para retenerlos antes de que se vayan?

## La solución

**App en vivo:** [data-analysis-ecommerce-horaciolaphitz.streamlit.app](https://data-analysis-ecommerce-horaciolaphitz.streamlit.app/)

### 1. ETL a un data mart en estrella

Pipeline en Python + SQL (`src/etl.py`, capa `sql/` con scripts de limpieza, mart, vistas y quality checks) que transforma los CSV crudos en una base **SQLite con esquema estrella**. La app lee solo del mart — nunca de los CSV.

### 2. App de insights en Streamlit — 6 tabs

- **Analysis** — KPIs generales: revenue, órdenes, AOV, distancia y demoras, con tendencias mensuales.
- **Logística** — distribución de demoras de entrega, tasa de entregas tardías por estado, distancia vs demora.
- **Reviews** — review scores y su relación con la demora de entrega.
- **Churn Sellers** — métricas del modelo, feature importance y ranking de vendedores en riesgo con recomendaciones.
- **Ventas** — ticket promedio mensual y peso del flete por categoría.
- **Segmentación** — RFM, cohortes de retención mensual y KPIs de riesgo de revenue.

### 3. Modelo de churn de vendedores

Pipeline completo de ML (`src/churn/`): labeling, feature engineering, entrenamiento, predicción, recomendaciones y monitoreo de drift. Sobre **2.433 vendedores** (churn rate 48%):

| Modelo | AUC-ROC | Precision | Recall | F1 |
|---|---|---|---|---|
| Regresión logística (baseline) | 0.90 | 0.88 | 0.74 | 0.80 |
| **XGBoost** | **0.99** | **0.95** | **0.94** | **0.95** |

El baseline no es decorativo: es lo que justifica el costo del modelo complejo.

## Calidad

16 archivos de test con **pytest** cubren cada capa — ETL, análisis, charts, segmentación y todo el pipeline de churn (labeling, features, entrenamiento, drift) — con fixtures de datos que replican el esquema de Olist.

## Resultado

Una plataforma de analytics desplegada y usable: del CSV crudo al insight accionable, con un modelo que señala qué vendedores retener y por qué, y una batería de tests que permite evolucionar cada capa sin romper el resto.
