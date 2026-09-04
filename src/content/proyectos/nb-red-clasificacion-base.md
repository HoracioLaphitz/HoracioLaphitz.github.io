---
title: "Red de Clasificación — Modelo Base"
description: "Versión base de una red de clasificación, punto de partida para iterar sobre arquitectura e hiperparámetros."
pubDate: 2024-03-07
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Neural Network", "Classification"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/RedNeuronalClasificacion/RedDeClasificacion.ipynb"
draft: true
resources:
  notebooks:
    - name: "Red de Clasificación — Base"
      path: "/Proyectos/Notebooks/RedNeuronalClasificacion/RedDeClasificacion.ipynb"
---

## El problema

Antes de optimizar un modelo hace falta una línea base medible. Este cuaderno establece esa referencia para un clasificador de imágenes: una modificación solo representa una mejora si supera el resultado inicial.

## Resolución

- Conjunto de imágenes cargado con **tensorflow_datasets**, con normalización de píxeles al intervalo [0, 1].
- Primera arquitectura: red densa (`Flatten` + capas `Dense`) como referencia.
- Segunda arquitectura en el mismo cuaderno: variante convolucional (`Conv2D` + `MaxPooling2D`) para compararla con la red densa.
- Entrenamientos de 10 y 50 épocas, con medición de la exactitud sobre el conjunto de prueba y visualización de predicciones mediante Matplotlib y OpenCV.

## Tecnologías

Python · TensorFlow · Keras · tensorflow_datasets · OpenCV

## Conocimiento demostrado

El valor de una referencia honesta: la red densa ya clasifica razonablemente bien, y ese resultado permite decidir si la complejidad adicional de las capas convolucionales se justifica en las iteraciones siguientes.
