'use strict';
import details from '../assets/icons/details.svg';
import noimg from '../assets/icons/no-img.svg';

document.addEventListener('DOMContentLoaded', function () {
  function drawGoals() {
    const container = document.querySelector('.tasks');

    if (localStorage.length) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        // console.log(`Ключ: ${key}, Значение: ${value}`);

        let obj = JSON.parse(value);

        const block = document.createElement('div');
        block.className = 'tasks__item';
        block.innerHTML = `
          <h2 class="tasks__item-title">${obj.itemGoalName}</h2>
          <a href="details.html" class="tasks__item-link"><img src="${details}"></a>
          <div class="tasks__item-img"><img src='${insertImg(obj.itemImgData)}' alt='photo'></div>
          <div class="tasks__item-summary">
            <div>Конец сбора через:</div>
            <div class="tasks__item-summary-dates">${countDays(obj.itemDateEnd, obj.itemDateStart)}</div>
            <div>Осталось собрать:</div>
            <div class="tasks__item-summary-sum">${obj.itemGoalSum - sumArrItems(obj.itemPayments)} ${rightSumFormat1(obj.itemGoalSum - sumArrItems(obj.itemPayments))}</div>
          </div>
          <div class="tasks__item-report">Прогресс цели: <span class="tasks__item-report-blue">${sumArrItems(obj.itemPayments)} ${rightSumFormat1(obj.itemPayments)} из ${obj.itemGoalSum} ${rightSumFormat2(obj.itemGoalSum)}</span></div>
          <div class="progress tasks__item-progress">
            <progress id="progress" value="10" max="100"></progress>
            <div class="progress-value"></div>
            <div class="progress-bg">
              <div class="progress-bar"></div>
            </div>
          </div>
        `;

        container.append(block);
      }
    }
  }

  //--------------------------------------------------------
  // functions for counting days, amounts, correct format of amounts, insert image

  function countDays(date1, date2) {
    let daysLeft = (new Date(date1) - new Date(date2)) / 1000 / 60 / 60 / 24;
    let endNum = daysLeft.toString().slice(-1);
    let text =
      endNum === '1'
        ? 'день'
        : endNum === '2' || endNum === '3' || endNum === '4'
        ? 'дня'
        : 'дней';
    return daysLeft + ' ' + text;
  }

  function sumArrItems(arr) {
    return arr.reduce((accum, curr) => accum + curr);
  }

  function rightSumFormat1(item) {
    let endNum = item.toString().slice(-1);

    let text =
      endNum === '1'
        ? 'рубль'
        : endNum === '2' || endNum === '3' || endNum === '4'
        ? 'рубля'
        : 'рублей';
    return text;
  }

  function rightSumFormat2(item) {
    let endNum = item.toString().slice(-1);

    let text = endNum === '1' ? 'рубль' : 'рублей';
    return text;
  }

  function insertImg(data) {
    return data ? data : noimg;
  }

  drawGoals();
});