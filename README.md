Делал на Node v14.17.1 и Ubuntu 20

Сделал как понял

Учет ошибок и обработку запросов не делал (оставил пустыми интерфейсы в корнях папок Transport'ов (requestListener.ts и handle.ts)

4 варианта использования в package.json/scripts и соответствующей папке src/usecases 

Раз уж сказали зарефакторить - зарефакторил: 

    Посчитал что будет лучше убрать логику старта сервиса впринципе и перенести эту ответственность в соответсвующие классы 
    Transport'ов. 
    Код в некоторых местах задублирован, но я посчитал это необходимостью, тк протоколы разные, то и конфигурация 
    классов и интерфейсов с обоих сторон может сильно разниться.
    
Из непонятного: 
    
    Из вашей логики в базовом классе явно видно, что 
        
        Если тип соединения - перманентный, то транспорт запускается в главном процессе, а в воркерах не запускается.
        
    Я сколько ни гуглил про кластеризацию этих вещей: насчет http ответ всегда конкретный, а вот на вопрос насчет websocket обычно 
    ответом идёт вопрос: а что вы хотите сделать? И как я понял, конфигурация кластера для вебсокетов может быть разной взависимости 
    от поставленной задачи.
    
    Решил просто раздать процессам инстанс http сервера из главного процесса и обернуть его в ws сервер на каждом из воркеров.
    
Приложу диаграмму классов: 
    ![123](https://user-images.githubusercontent.com/42176041/158400527-f0833858-c1ce-4a48-8d17-72db1769b839.png)
    
