---
title: "Predicción de Precios"
description: "Modelo de regresión que pone precio a una vivienda a partir de sus características — superficie, ubicación, antigüedad — y se evalúa sobre datos que nunca vio."
pubDate: 2024-04-01
category: "Notebooks Analytics"
tags: ["Python", "Scikit-learn", "Regression", "Machine Learning", "Pandas"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Predice-Precios-Casas/Predice-Precios-Casas.ipynb"
draft: false
resources:
  notebooks:
    - name: "Predicción de Precios"
      slug: "prediccion-de-precios-de-casas"
      path: "/Proyectos/Notebooks/Predice-Precios-Casas/Predice-Precios-Casas.ipynb"
---

## El problema

Estimar el precio de una vivienda a partir de sus características — superficie, ubicación, antigüedad.
Un problema de regresión supervisada donde el riesgo es evaluar sobre los mismos datos con los que se entrenó.

## Resolución

- Análisis exploratorio con **Pandas** y **Seaborn**: correlaciones entre variables y precio, distribución de la variable objetivo y detección de valores atípicos.
- Modelo de regresión con **Scikit-learn**, entrenado sobre la partición de entrenamiento.
- Evaluación con **MSE** sobre el conjunto de prueba —datos que el modelo nunca vio— para medir el error de generalización.

## Tecnologías

Python · Scikit-learn · Pandas · Seaborn · NumPy

## Conocimiento demostrado

El flujo completo de una regresión supervisada: desde el análisis exploratorio que señala las variables relevantes hasta la métrica de error que permite evaluar el modelo.
