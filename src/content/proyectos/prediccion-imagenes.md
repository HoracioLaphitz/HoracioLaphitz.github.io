---
title: "Predicción con Imágenes — Clasificación por Píxeles"
description: "Aprendizaje profundo aplicado a visión por computadora: un modelo con transferencia de aprendizaje que representa imágenes mediante píxeles y las clasifica sin entrenar desde cero."
pubDate: 2024-02-13
category: "Análisis de datos"
tags: ["Python", "TensorFlow", "Deep Learning", "Transfer Learning", "Computer Vision"]
github: "https://github.com/HoracioLaphitz/PrediccionImagenes"
resources:
  notebooks:
    - name: "Transferencia de Aprendizaje"
      path: "/Proyectos/Notebooks/PrediccionImagenes/PrediccionImagenes-TRANSFERENCIA_APRENDIZAJE.ipynb"
draft: false
---

## Situación

Una imagen para una persona es obvia; para una máquina es una matriz de píxeles. El puente entre ambos es un modelo entrenado.

## El desafío

Lograr que un script clasifique correctamente imágenes nuevas, convirtiéndolas a píxeles y reconociendo de qué se trata cada una.

## La solución

Un modelo de aprendizaje profundo con **transferencia de aprendizaje**: reutiliza las variables aprendidas por un modelo preentrenado y se ajusta con el conjunto propio. Entrena más rápido y con mayor precisión que una red creada desde cero.

## Impacto

Clasificación funcional de imágenes que muestra cómo aprovechar modelos preentrenados. El ajuste fino llevó la **`val_accuracy` del 79,69 % al 100 %** (`val_loss` final: 0,0179) en pocas épocas. Esa progresión muestra el efecto de la transferencia de aprendizaje frente al entrenamiento con inicialización aleatoria.
