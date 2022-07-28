const tipJSON = [
    {
        name: "Triangle d'exposition",
        description: [
            {
                text: "Le triangle d'exposition est l'ensemble des trois réglages de votre boitier qui compose le mode M (manuel).",
                videoId: ""
            },
            {
                text: `L'ouverture :
L'ouverture représente l'ouverture du diaphragme de votre objectif représenté par la lettre F exemple f8, f2 ...
Plus la valeur F est petite, plus votre diaphragme est dit ouvert exemple f2.8, f1.8, f1.2.

Plus votre diphragme est ouvert :
- Plus votre photo sera lumineuse.
- Plus votre zone de netteté sera réduite, ce qui laissera place à un joli flou d'arrière plan.

À l'inverse, Plus votre diphragme est fermé :
- Moins votre photo sera lumineuse 
- Plus votre zone de netteté sera étendue et donc plus votre arrière plan sera net.`,
                videoId: "ZDDDdfQtGIg"
            },
            {
                text: `La vitesse d'obturation :
La vitesse d'obturation est représentée par une fraction, exemple 1/100.
Cette valeur représente le temps que l'obturateur laisse le capteur exposé à la lumiere et donc la vitesse à laquelle la photo est prise.

Plus la vitesse est élevée :
- Moins votre capteur est éxposé et donc moins vous avez de lumière qui rentre dans le capteur.
- Plus la photo est prise rapidement et plus vous pourrez figer le mouvement sans craindre de flou de bougé.

À l'inverse, plus la vitesse est lente,  plus votre capteur est exposé plus vous aurez de lumière dans l'image. 
Plus la vitesse est lente,  plus la photo est prise lentement ce qui va laisser place à des flous de mouvement, voire à main levée des flous de bougé`,
                videoId: "rVchIP2k16g"
            },
            {
                text: `L'iso :
La valeur iso est l'indice de sensibilité du capteur à la lumiere, exemple 100, 200, 1600...

Plus votre valeur est basse, exemple 100 ou 200, moins vous aurez de lumière dans l'image, mais plus la qualité de l'image bonne.

Plus la valeur est haute, exemple 6400 12800, plus vous aurez de lumière dans l'image, mais plus vous aurez de bruit numérique qui va venir dégrader votre image.`,
                videoId: "zPcqRrDG7Ao"
            },
        ],
        array: [],
        image: "asset:/Image/Tip/triangle_expo.png",
    },
    {
        name: "Hyperfocal",
        description: [
            {
                text: `L'hyper focal est une technique de mise au point qui permet de trouver la distance à laquelle faire la mise au point pour optenir la plus grande zone de netteté possible à une ouverture et une focale donnée.
                
Exemple : 
Avec un 35mm ouverte à f/5
Il faut faire la mise au point à 8m14.
Tout ce qui sera après 8m14 sera parfaitement net.`,
                videoId: "D_HB7u_um4Q"
            },
        ],
        array: [
            [`Distance
focal
(en mm)`, "12", "14", "18", "20", "24", "35", "40", "50", "60", "75", "85", "90", "100", "105"],
            ["F/1.2", "4.05", "5.51", "9.10", "11.23", "16.17", "34.37", "44.89", "70.12", "100.97", "157.74", "202.60", "227.13", "280.40", "309.13"],
            ["F/1.4", "3.41", "4.63", "7.65", "9.46", "13.60", "28.91", "37.75", "58.98", "100.91", "132.66", "170.38", "191.01", "235.80", "259.97"],
            ["F/1.6", "3.04", "4.13", "6.82", "8.42", "12.12", "25.76", "33.64", "52.55", "75.66", "118.19", "151.80", "170.18", "210.09", "331.62"],
            ["F/1.8", "2.71", "3.68", "60.8", "7.50", "10.80", "22.95", "29.97", "46.82", "67.41", "105.31", "135.25", "151.62", "187.18", "206.36"],
            ["F/2", "2.41", "3.28", "5.42", "6.69", "9.62", "20.45", "26.71", "41.72", "60.06", "93.83", "120.50", "135.09", "166.77", "183.86"],
            ["F/2.2", "2.15", "2.92", "4.83", "5.96", "8.58", "18.22", "23.80", "37.17", "53.51", "83.60", "107.36", "120.36", "148.58", "163.81"],
            ["F/2.5", "1.92", "2.61", "4.30", "5.31", "7.64", "16.24", "21.21", "33.12", "47.68", "74.48", "95.66", "107.24", "132.38", "145.95"],
            ["F/2.8", "1.71", "2.32", "3.84", "4.73", "6.81", "14.47", "18.90", "29.51", "42.49", "66.37", "85.23", "95.55", "117.95", "130.04"],
            ["F/3.2", "1.52", "2.07", "3.42", "4.22", "6.07", "12.90", "16.84", "26.30", "37.86", "59.13", "75.94", "85.13", "105.09", "115.86"],
            ["F/3.5", "1.36", "1.85", "3.05", "3.76", "5.41", "11.49", "15.01", "23.43", "33.73", "52.69", "67.67", "75.86", "93.64", "103.23"],
            ["F/4", "1.21", "1.65", "2.72", "3.35", "4.82", "10.24", "13.37", "20.88", "30.06", "46.95", "60.29", "67.59", "83.43", "91.98"],
            ["F/4.5", "1.08", "1.47", "2.42", "2.99", "4.30", "9.13", "11.92", "18.61", "26.79", "41.84", "53.72", "60.23", "74.34", "81.96"],
            ["F/5", "0.96", "1.31", "2.16", "2.67", "3.83", "8.14", "10.62", "16.59", "23.87", "37.28", "47.87", "56.66", "66.24", "75.03"],
            ["F/5.6", "0.86", "1.17", "1.93", "2.38", "3.46", "7.25", "9.47", "14.78", "21.27", "33.22", "42.66", "47.82", "59.03", "65.07"],
            ["F/6.3", "0.77", "1.04", "1.72", "2.12", "2.88", "6.47", "8.44", "13.17", "18.96", "29.60", "38.01", "42.61", "52.60"," 57.98"],
            ["F/7.1", "0.69", "0.93", "1.53", "1.89", "2.72", "5.76", "7.52", "11.74", "16.90", "26.38", "33.88", "37.97", "46.87", "41.67"],
            ["F/8", "0.61", "0.83"," 1.37", "1.69", "2.42", "5.14", "6.71", "10.47", "15.06", "23.51", "30.19", "33.84", "41.77", "46.04"],
            ["F/9", "0.55", "0.70", "1.22", "1.50", "2.16", "4.58", "5.98", "9.33", "13.42", "20.96", "26.90", "30.16", "37.22", "41.03"],
            ["F/10", "0.49", "0.66", "1.09", "1.34", "1.93", "4.09", "5.33", "8.32", "11.97", "18.68", "23.98", "26.88", "33.17", "36.47"],
            ["F/11", "0.44", "0.59", "0.97", "1.20", "1.72", "3.64", "4.75", "7.42", "10.67", '16.65', "21.37", "23.95", "29.56", "32.59"],
            ["F/13", "0.39", "0.53", "0.87", "1.07", "1.54", "3.25", "4.24", "6.61", "9.51", "14.84", "19.05", "21.35", "26.35", "29.03"],
            ["F/14", "0.35", "0.47", "0.78", "0.96", "1.37", "2.90", "3.78", "5.90", "8.48", "13.23", "16.98", "19.03", "23.48", "25.89"],
            ["F/16", "0.31", "0.42", "0.69", "0.85", "1.22", "2.59", "3.37", "5.26", "7.56", "11.79", "15.14", "16.97", "20.93", "23.07"],
            ["F/18", "0.28", "0.38", "0.62", "0.76", "1.09", "2.31", "3.01", "4.69", "6.74", "10.52", "13.49", "15.12", "18.66", "20.57"],
            ["F/20", "0.26", "0.34", "0.55", "0.68", "0.98", "2.06", "2.69", "4.18", "6.01", "9.38", "12.03", "13.48", "16.64", "18.34"],
            ["F/22", "0.22", "0.30", "0.50", "0.61", "0.87", "1.84", "2.40", "3.73", "5.36", "8.36", "10.73", "12.02", "14.83", "16.35"],
            ["F/25", "0.20", "0.27", "0.44", "0.54", "0.78", "1.64", "2.14", "3.33", "4.78", "7.46", "9.57", "10.72", "13.22", "14.57"],
            ["F/29", "0.18", "0.24", "0.40", "0.49", "0.70", "1.47", "1.91", "2.97", "4.27", "6.65", "8.53", "9.56", "11.79", "13.00"],
            ["F/32", "0.16", "0.22", "0.36", "0.44", "0.62", "1.31", "1.71", "2.65", "3.81", "5.93", "7.61", "8.53", "10.52", "11.59"]
        ],
        image: "",
    },
    {
        name: "Règle des 500",
        description: [
            {
                text: `Pour photographier les étoiles facilement vous devez:

- Utiliser un trépied
- Utiliser le plus grand angle que vous avez, à sa plus grande ouverture, avec le focus sur l'infini.
- Monter vos iso au maximum utilisable par votre boitier avant d'avoir trop de bruit.
- Utiliser la règle des 500 pour régler votre shutter.
                
La règle des 500 (plein format)  
                
Elle est la suivante : 
                
500 / focale utilisée en mm = temps de pose. 
                
Admettons que vous utilisez un objectif 24 mm, la formule donne alors : 500 / 24 (mm) = 20,8 (secondes). 
                
Si vous photographiez les étoiles avec cette combinaison, il ne faudra donc pas dépasser les 20 secondes de pose.
                
Si vous utilisez un capteur APS-C, la formule est légèrement différente puisqu’il faut ajouter le coefficient multiplicateur de l’objectif (1,5 x chez Nikon, Sony et Pentax ; 1,6x chez Canon ; etc.). La formule devient alors : 500 / (focale en mm x coeff multiplicateur) = temps de pose.
Avec un 24 mm de Canon, par exemple, on obtient : 500 / (1,6 x 24) = 13 secondes.`,
                videoId: ""
            },
        ],
        array: [],
        image: "",
    },
    {
        name: "Règle de cadrage",
        description: [
            {
                text: `TYPES DE CADRAGE:
Le cadrage horizontal (format paysage): Adapté à une scène générale, groupe de personnes ou paysage. 
Le cadrage vertical (format portrait): Adapté au portrait ou à des éléments verticaux.
                
ANGLES DE CADRAGE: 
Cadrage de face: L'axe otique est positionné de manière horizontale.
Cadrage de plongée: L'axe otique est positionné vers bas, le photographe est positionné au-dessus de son sujet.
Cadrage contre-plongée: L'axe optique est incliné vers le haut. Le photographe est placé sous son sujet.
                
PHOTOGRAPHIER UNE PERSONNE:
Il faut prendre en compte les éléments physiques de son modèle et savoir comment les coupés.
                
Les différents plans:            
-Plan plein pieds: Montrer son sujet des piedds à la tête.
-Plan américain: Couper une personne à mi-cuisses.
-Plan buste: Laisser voir qu'une partie du sujet. Couper à la taille ou à la poitrine.
-Plan rapproché : Mettre en valeur qu'une partie de son sujet.
-Plan macro : Mettre en valeur un seul detail de son sujet.
                
Règle universel: Ne jamais coupé aux articulations.`,
                videoId: "ISfB74g2TiU"
            },
        ],
        array: [],
        image: "asset:/Image/Tip/cadrage.png",
    },
]

export default tipJSON