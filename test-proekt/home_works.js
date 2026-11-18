[
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  }
]
function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}
function moveBlock(position = 0) {
    const smallBlock = document.querySelector(".small-block"); 
    
    if (!smallBlock) return; 

    
    position += 2;
    smallBlock.style.left = `${position}px`;

    
    if (position < 300) {
        
        setTimeout(() => {
            moveBlock(position);
        }, 20); 
    }
}



function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail ? reject(new Error(`Ошибка при обработке: ${value}`)) : resolve(value);
        }, ms);
    });
}





delay(1, 500)
    .then(result1 => {
        console.log('Шаг 1 пройден:', result1);
        
        return delay(result1 + 1, 500, true);
    })
    .then(result2 => {
        console.log('Шаг 2 пройден (не выполнится):', result2);
        return delay(result2 + 1, 500);
    })
    .then(result3 => {
        console.log('Шаг 3 пройден (не выполнится):', result3);
    })
    .catch(error => {
        console.error('Задание 1. Перехвачена ошибка:', error.message);
    })
    .finally(() => {
        console.log('Задание 1. Блок .finally сработал в любом случае');
    });



async function processValuesArray() {
    const values = [1, 2, 3, 4];
    const results = [];

    for (let val of values) {
        try {
            
            const shouldFail = Math.random() > 0.7;
            const res = await delay(val, 500, shouldFail);
            results.push({ value: res, error: null });
        } catch (err) {
          
            results.push({ value: null, error: err.message });
        }
    }

    console.log('Задание 2. Результаты обработки массива:', results);
}

processValuesArray();



async function runParallelTests() {
    
    
    try {
        const allResults = await Promise.all([
            delay('A', 100),
            delay('B', 200, true), 
            delay('C', 300),
            delay('D', 400)
        ]);
        console.log('Promise.all успех:', allResults);
    } catch (error) {
        console.error('Promise.all поймал ошибку:', error.message);
    }

    // Б) Promise.allSettled — ждет всё и делит на succeeded и failed
    const settledResults = await Promise.allSettled([
        delay('A', 100),
        delay('B', 200, true),
        delay('C', 300),
        delay('D', 400)
    ]);

    const succeeded = settledResults.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = settledResults.filter(r => r.status === 'rejected').map(r => r.reason.message);
    
    console.log('Promise.allSettled - Успешные (succeeded):', succeeded);
    console.log('Promise.allSettled - Ошибки (failed):', failed);

    
    try {
        const raceResult = await Promise.race([
            delay('Полезные данные получены', 2000),
            delay('Таймаут истек!', 500, true)       
        ]);
        console.log('Promise.race успех:', raceResult);
    } catch (error) {
        console.error('Promise.race поймал ошибку (таймаут):', error.message);
    }
}

runParallelTests();
