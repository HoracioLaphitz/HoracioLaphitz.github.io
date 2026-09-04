---
title: "Transferencia de aprendizaje"
description: "Transferencia de aprendizaje para clasificar imágenes con buena precisión y menor costo de cómputo mediante una red preentrenada."
pubDate: 2024-04-15
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Transfer Learning", "Deep Learning", "Computer Vision"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/TransferenciaAprendizaje/TransferenciaAprendizaje.ipynb"
draft: false
resources:
  notebooks:
    - name: "Transferencia de Aprendizaje"
      path: "/Proyectos/Notebooks/TransferenciaAprendizaje/TransferenciaAprendizaje.ipynb"
---

## El problema

Entrenar una red de visión desde cero exige millones de imágenes y horas de GPU. Para un problema de clasificación acotado, es pagar un costo que otro ya pagó.

## Resolución

- Modelo preentrenado descargado de **TensorFlow Hub** como extractor de variables congelado: las capas convolucionales ya reconocen bordes, texturas y formas.
- Encima del extractor, una capa `Dense` propia entrenada solo para las clases del problema nuevo.
- Preprocesamiento de imágenes con **PIL** y **OpenCV** para ajustarlas al tamaño y al formato requeridos por el modelo, y evaluación de la exactitud sobre el conjunto de prueba.

## Tecnologías

Python · TensorFlow · TensorFlow Hub · Keras · OpenCV · PIL

## Conocimiento demostrado

La transferencia de aprendizaje reduce el cómputo y la cantidad de datos necesarios para alcanzar precisiones que serían difíciles de obtener desde cero en el mismo tiempo.
