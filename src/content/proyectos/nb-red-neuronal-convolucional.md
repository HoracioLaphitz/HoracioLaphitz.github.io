---
title: "Red Neuronal Convolucional (CNN)"
description: "Implementación de una CNN para clasificación de imágenes desarrollado con TensorFlow/Keras."
pubDate: 2024-03-05
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "CNN", "Deep Learning", "Computer Vision"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Red-Neuronal-Convolucional/Red%20Neuronal%20Convolucional.ipynb"
draft: false
resources:
  notebooks:
    - name: "CNN Principal"
      path: "/Proyectos/Notebooks/Red-Neuronal-Convolucional/Red Neuronal Convolucional.ipynb"
    - name: "Análisis Exploratorio"
      path: "/Proyectos/Notebooks/Red-Neuronal-Convolucional/experiments/01_exploratory_analysis.ipynb"
---

## El problema

Una red densa  trata cada píxel como independiente y pierde la estructura espacial de la imagen. Las CNN existen para eso: detectar patrones locales (Data Analytics | Machine Learning | GenAIbordes, texturas, formas) y componerlos jerárquicamente.

## Resolución

- Dataset de imágenes vía **tensorflow_datasets**, con normalización y separación de los datos en entrenamiento y prueba.
- Arquitectura convolucional en **Keras**: bloques `Conv2D` + `MaxPooling2D` para extraer features, luego `Flatten` + `Dense` para clasificar.
- Entrenamientos de 10 y 50 épocas comparando contra la versión densa, con inspección visual de predicciones usando OpenCV y Matplotlib.
- Notebook complementario de **análisis exploratorio** en `experiments/` con la inspección previa del dataset.

## Stack

Python · TensorFlow · Keras · tensorflow_datasets · OpenCV

## Moraleja

Por qué la convolución gana en visión: menos parámetros que una densa equivalente y mejor accuracy, porque la arquitectura codifica el conocimiento de que los píxeles vecinos se relacionan.
