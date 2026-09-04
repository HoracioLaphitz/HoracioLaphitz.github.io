---
title: "Red Neuronal para estimaciones sobre terremotos"
description: "Modelo de red neuronal que estima variables sísmicas a partir de datos históricos de terremotos."
pubDate: 2024-03-10
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Neural Network", "Deep Learning", "Time Series"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/RedNeuronalTerremotos/RedNeuronalTerremotos.ipynb"
draft: false
resources:
  notebooks:
    - name: "Red Neuronal — Terremotos"
      path: "/Proyectos/Notebooks/RedNeuronalTerremotos/RedNeuronalTerremotos.ipynb"
---

## El problema

Un catálogo sísmico histórico tiene miles de registros con magnitud, profundidad y coordenadas. La pregunta: ¿puede una red neuronal estimar una variable sísmica a partir de las demás, en un dominio tan ruidoso como los terremotos?

## Resolución

- Preparación del conjunto histórico con **Pandas** y **NumPy**: selección de variables, normalización y división entre entrenamiento y prueba con Scikit-learn.
- Red neuronal densa en **Keras** (capas `Dense`), entrenada durante 50 épocas con **MSE** como función de pérdida — es un problema de regresión, no de clasificación.
- Curvas de pérdida con Matplotlib para controlar la convergencia y detectar sobreajuste.

## Tecnologías

Python · TensorFlow · Keras · Scikit-learn · Pandas

## Conocimiento demostrado

Transformación de datos geofísicos ruidosos, preparación para arquitectura de datos: la red converge, pero el techo de precisión lo pone la señal disponible en los datos, no la cantidad de capas.
