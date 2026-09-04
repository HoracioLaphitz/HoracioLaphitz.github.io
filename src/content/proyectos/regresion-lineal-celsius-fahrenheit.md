---
title: "Regresión Lineal — Temperaturas"
description: "Un modelo que descubre solo la relación Celsius–Fahrenheit a partir de ejemplos."
pubDate: 2024-02-13
category: "Análisis de datos"
tags: ["Python", "Machine Learning", "Linear Regression", "TensorFlow"]
github: "https://github.com/HoracioLaphitz/Regresion_Lineal"
draft: true
resources:
  notebooks:
    - name: "Regresión Lineal — Temperaturas"
      slug: "regresion-lineal-celsius-a-fahrenheit"
      path: "/Proyectos/Notebooks/Celcius_a_Fahrenheit.ipynb"
---

## Situación

La conversión Celsius → Fahrenheit tiene una fórmula exacta. Pero es un caso ideal para mostrar cómo un modelo **descubre** esa relación solo a partir de ejemplos.

## El desafío

Entrenar un modelo que aprenda la relación lineal entre ambas escalas sin darle la fórmula, únicamente pares de datos.

## La solución

Un modelo de regresión lineal simple: el algoritmo ajusta pendiente y sesgo hasta minimizar el error, convergiendo a los coeficientes reales de la fórmula.

## Impacto

Un ejemplo pedagógico de lo que significa «aprender» para un modelo de aprendizaje automático.
