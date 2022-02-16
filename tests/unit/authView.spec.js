import { createStore } from "vuex"
import { mount, flushPromises  } from '@vue/test-utils'
import AuthView from "../../src/views/AuthView/AuthView";

jest.mock('axios', () => ({
  post: (_url, _body) => new Promise((resolve, reject) => {
    console.log(_body.data.login !== 'TankistPro')
    if (_body.data.login !== 'TankistPro') {
      return reject({
        response: {
          status: false,
          data: {
            msg: 'НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ'
          }
        }
      })
    } else {
      return resolve({
        response: {
          status: true,
          data: {
            msg: 'НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ'
          }
        }
      })
    }
  })
}))

describe('AuthView.vue', () => {
  it('Проверка на вывод сообщения о незаполненных полях', () => {
    const wrapper = mount(AuthView);

    wrapper.setData({
      login: null,
      password: null
    })

    wrapper.findComponent({ name: 'MyButton' }).trigger('click'); // событие клика на кнопку ВОЙТИ

    expect(wrapper.vm.error.status).toBe(false); // проверка что статуст ошибки TRUE
    expect(wrapper.find('.error').text()).toEqual('Поля не могут быть пустыми!'); // проверка текста ошибки
  });

  it('Пользователь ввел корректные данные', async () => {
    const wrapper = mount(AuthView);

    await wrapper.setData({
      type: 'employee',
      login: 'TankistPro',
      password: 'Qwerty1234'
    })

    await wrapper.findComponent({name: 'MyButton'}).trigger('click'); // событие клика на кнопку ВОЙТИ

    await flushPromises()

    expect(wrapper.vm.error.status).toBe(false); // проверка что статуст ошибки FALSE
  } )
})

// it('Пользователь ввел данные несуществующиего пользователя', async () => {
//   const wrapper = mount(AuthView);
//
//   await wrapper.setData({
//     type: 'employee',
//     login: 'TankistP',
//     password: 'Qwerty123'
//   })
//
//   await wrapper.findComponent({name: 'MyButton'}).trigger('click'); // событие клика на кнопку ВОЙТИ
//
//   await flushPromises()
//
//   expect(wrapper.vm.error.status).toBe(true); // проверка что статуст ошибки TRUE
//   expect(wrapper.vm.error.message).toEqual('НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ'); // проверка текста ошибки
// })
