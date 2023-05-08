class IMCCalculator {
    constructor(peso, altura) {
        this.peso = peso;
        this.altura = altura;
        this.rangos = [
            { valor: 16, mensaje: 'Delgadez extrema' },
            { valor: 16.99, mensaje: 'Delgadez moderada' },
            { valor: 18.49, mensaje: 'Delgadez aceptable' },
            { valor: 24.99, mensaje: 'Peso normal' },
            { valor: 30, mensaje: 'Sobrepeso' },
            { valor: 34.99, mensaje: 'Obesidad tipo 1' },
            { valor: 40, mensaje: 'Obesidad tipo 2' },
            { valor: 49.99, mensaje: 'Obesidad tipo 3' },
            { valor: Infinity, mensaje: 'Obesidad extrema' },
        ];
    }

    calcularImc() {
        const indiceEntero = this.peso / (this.altura * this.altura);
        return indiceEntero.toFixed(2);
    }

    interpretarIMC() {
        const imc = this.calcularImc();

        for (let i = 0; i < this.rangos.length; i++) {
            if (imc < this.rangos[i].valor) {
                return this.rangos[i].mensaje;
            }
        }
    }
}

const calcularBtn = document.querySelector('#calcular-btn');
const resultadoDiv = document.querySelector('#resultado');

calcularBtn.addEventListener('click', () => {
    const peso = parseFloat(document.querySelector('#peso').value);
    const altura = parseFloat(document.querySelector('#altura').value) * 0.01;

    const imcCalculator = new IMCCalculator(peso, altura);
    const interpretacionIMC = imcCalculator.interpretarIMC();

    // Guardar en LocalStorage
    localStorage.setItem('peso', peso);
    localStorage.setItem('altura', altura);

    resultadoDiv.innerHTML = `<p>Su IMC es ${imcCalculator.calcularImc()} e indica que tiene "${interpretacionIMC}"</p>`;
    mostrarConsejos(imcCalculator.calcularImc());
});
function mostrarConsejos(imc) {
    let consejos = '';

    if (imc < 16) {
        consejos =
            'Tu IMC indica que tienes delgadez severa y que estás por debajo de tu peso saludable. Para aumentar de peso de manera saludable, es importante que incluyas en tu dieta alimentos ricos en nutrientes y calorías, como grasas saludables, semillas, frutas, carnes magras y pescados.';
    } else if (imc < 18.5) {
        consejos =
            'Tu IMC indica que tienes un peso inferior al normal. Es importante que comas una dieta equilibrada y saludable que incluya alimentos ricos en nutrientes como frutas, verduras, carnes magras, pescado, frutos secos y semillas para aumentar de peso de manera saludable.';
    } else if (imc < 25) {
        consejos =
            'Considerando tu IMC, tienes un peso saludable. Continúa con una dieta equilibrada y activa para mantenerlo así.';
    } else if (imc < 30) {
        consejos =
            'Según tu IMC, tienes un índice de masa corporal que indica que tienes sobrepeso. Esto puede aumentar tu riesgo de desarrollar enfermedades graves como diabetes, enfermedades del corazón y cáncer. Para mejorar tu salud y reducir el riesgo de estas enfermedades, es importante que tomes medidas para bajar de peso. Para lograrlo, es fundamental que sigas una dieta saludable y equilibrada con un déficit calórico moderado. Esto significa que debes consumir menos calorías de las que quemas cada día. Puedes lograrlo mediante la elección de alimentos ricos en nutrientes, como frutas, verduras, proteínas magras y granos enteros. También es importante que limites el consumo de alimentos procesados, ricos en grasas saturadas, sal y azúcares agregados.';
    } else if (imc < 35) {
        consejos =
            'Según tu IMC, tienes un sobrepeso moderado y es importante que trabajes en la reducción de peso para disminuir el riesgo de desarrollar enfermedades graves como la diabetes, enfermedades del corazón y el cáncer. Para lograrlo, es fundamental que lleves una alimentación saludable y equilibrada con una reducción moderada de calorías y que realices actividad física de manera regular. Considera buscar asesoramiento profesional si necesitas ayuda para controlar tu peso. Recuerda que llevar un estilo de vida saludable no solo mejora tu salud física, sino también tu bienestar emocional y mental.';
    } else if (imc < 40) {
        consejos =
        'Tu IMC indica que tienes un exceso de peso y se encuentra en el rango de obesidad. Este exceso de peso aumenta el riesgo de desarrollar enfermedades graves como diabetes, enfermedades del corazón y cáncer. Por lo tanto, es importante que tomes medidas para mejorar tu salud. Se recomienda una combinación de dieta y ejercicio para perder peso de manera saludable y sostenible. Una dieta saludable y equilibrada junto con una actividad física regular puede mejorar tu salud y ayudarte a perder peso. Además, también es recomendable consultar a un profesional de la salud para obtener consejos y apoyo personalizados.';
    } else {
        consejos =
        'Tu IMC indica que tienes obesidad de tipo 3 (obesidad mórbida). Es importante que reduzcas tu peso para disminuir el riesgo de desarrollar enfermedades graves como diabetes, enfermedades del corazón y cáncer. Para lograrlo, es recomendable que consultes con un profesional de la salud para que te asesore en una dieta saludable y equilibrada con un déficit calórico moderado y un plan de ejercicio regular. En algunos casos, se puede requerir ayuda médica para controlar tu peso de manera efectiva y segura.';
    }

    const consejosDiv = document.querySelector('#consejos');
    consejosDiv.innerHTML = `<p>${consejos}</p>`;
}
