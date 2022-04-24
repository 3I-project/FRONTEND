<template>
  <div class="about">
    <div class="about-section">
      <div class="about-section__header">
        <p class="about-section__title">Личная информация</p>
        <span class="about-section__button">Редактировать</span>
      </div>
      <textarea class="about-section__field about-section__field_textarea" placeholder="Укажите информация о себе..."></textarea>
    </div>
    <div class="about__wrapper">
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Образование</p>
          <span class="about-section__button">Редактировать</span>
        </div>
        <input type="text" class="about-section__field about-section__field_input" placeholder="Не указано" />
      </div>
      <div class="about-section">
        <div class="about-section__header">
          <p class="about-section__title">Дата рождения</p>
          <span class="about-section__button">Редактировать</span>
        </div>
        <input type="text" class="about-section__field about-section__field_input" placeholder="Пример: 25.10.22" />
      </div>
    </div>
  </div>
</template>

<script>
import './aboutTab.scss';

export default {
  name: "AboutTab"
}
</script>
