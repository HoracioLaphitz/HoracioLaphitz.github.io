---
title: "Regresión Logística — Clasificación Binaria"
description: "La regresión logística permite resolver problemas de clasificación binaria y evaluar precisión, exhaustividad y matriz de confusión."
pubDate: 2024-03-15
category: "Notebooks Analytics"
tags: ["Python", "Scikit-learn", "Logistic Regression", "Classification", "Machine Learning"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Regresion-Logistica/Regresion%20Logistica.ipynb"
draft: false
resources:
  notebooks:
    - name: "Regresión Logística"
      path: "/Proyectos/Notebooks/Regresion-Logistica/Regresion Logistica.ipynb"
---

## El problema

En una clasificación binaria se decide entre dos resultados a partir de un conjunto de variables. La exactitud no basta para evaluar el clasificador: con clases desbalanceadas puede ser alta aunque el modelo no resulte útil.

## Resolución

- Análisis exploratorio previo con **Pandas** y **Seaborn** para entender la distribución de las variables y el balance de las clases.
- Modelo de **regresión logística** con Scikit-learn, entrenado sobre la partición de entrenamiento y evaluado con datos que nunca vio.
- Evaluación completa mediante `classification_report` —precisión, exhaustividad y F1 por clase— y una **matriz de confusión** para distinguir entre falsos positivos y falsos negativos.

## Tecnologías

Python · Scikit-learn · Pandas · Seaborn

## Conocimiento demostrado

Cómo elegir la métrica según el costo del error: cuándo importa más la exhaustividad —no omitir positivos— y cuándo la precisión —no generar falsas alarmas—. La matriz de confusión muestra información que la exactitud agregada oculta.
