---
title: "Red Neuronal de Clasificación"
description: "Red neuronal para un problema de clasificación multiclase, con preprocesamiento y evaluación de métricas."
pubDate: 2024-03-06
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Neural Network", "Classification", "Deep Learning"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Red-de-Clasificacion/Red%20de%20Clasificacion.ipynb"
draft: true
resources:
  notebooks:
    - name: "Red Neuronal de Clasificación"
      path: "/Proyectos/Notebooks/Red-de-Clasificacion/Red de Clasificacion.ipynb"
---

## El problema

Clasificación multiclase de imágenes: dado un dígito manuscrito, decidir entre 10 categorías posibles. Es el problema canónico para entender cómo una red densa produce una distribución de probabilidad por clase.

## Resolución

- Carga y preprocesamiento del conjunto de datos con **tensorflow_datasets**: normalización de píxeles y separación entre entrenamiento y prueba.
- Red densa en **Keras**: `Flatten` para pasar de matriz de píxeles a vector, capas `Dense` ocultas y salida softmax de 10 neuronas.
- Entrenamiento de 10 épocas, con medición de la exactitud y visualización de predicciones individuales mediante Matplotlib para observar los aciertos y los errores.

## Tecnologías

Python · TensorFlow · Keras · tensorflow_datasets

## Conocimiento demostrado

Cómo diseñar la capa de salida según el problema —softmax y una neurona por clase— y cómo interpretar los errores del modelo mediante ejemplos concretos, además de la métrica agregada.
