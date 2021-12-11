<template>
  <div class="idea">
    <div class="idea__header">
      <div class="idea-author">
        <img src="../../../src/assets/idea/avatar.png" alt="">
        <p>Андрей Николаевич предлагает:</p>
      </div>
      <div class="idea-date">
        <p>Дата публикации: 10 сенября 2021года.</p>
      </div>
    </div>
    <div class="idea__content">
      <h3 class="idea-title">Приложение для заказа уборки снега</h3>
      <div class="idea-content-body">
        <p class="idea-content-body__text">
          Приложение для уборки снега – это сервис по запросу, который помогает решить проблему пользователя. Клиент заполняет запрос на уборку снега в приложении, указывает участок и другие параметры, а исполнитель убирает территорию.
          Что значит on-demand? Эта бизнес-модель предполагает, что получение заказов происходит полностью онлайн, а выполнение работы – офлайн. Самый популярный пример такого приложения – Uber. С помощью него клиент получает не просто услуги, а вообще доступ к ним именно в тот момент, когда они нужны. Таким образом, если в традиционном варианте клиенту нужно сделать несколько звонков или прийти к исполнителю,
          то модель on-demand сводит эту «боль» клиента к нулю. ...
        </p>
      </div>
    </div>
    <div class="idea__footer">
      <div class="idea-controllers">
        <div class="idea-controllers__item like-controller">
          <img src="../../../src/assets/idea/controllers/like.svg" alt="">
          <p>10</p>
        </div>
        <div class="idea-controllers__item dislike-controller">
          <img src="../../../src/assets/idea/controllers/dislike.svg" alt="">
          <p>5</p>
        </div>
        <div class="idea-controllers__item comment-controller">
          <img src="../../../src/assets/idea/controllers/comment.svg" alt="">
          <p>5</p>
        </div>
      </div>
      <div class="idea-type">
        <p>Тип: бизнес идея</p>
      </div>
    </div>
  </div>
</template>

<script>
import './idea.scss';

export default {
  name: "Idea",
}
</script>
