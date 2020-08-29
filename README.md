# Проект 4: Место

### [Просмотр](https://alb040570.github.io/mesto/index.html)

- Описание проекта
- Функциональность
- Использованные технологии

**Описание проекта**
Проект по разработке сервиса Mesto: интерактивной страницей, куда можно добавлять фотографии, удалять их и ставить лайки. Проект разработан в рамках проектной работы  № 5 по итогам курса "Базовый JavaScript и работа с браузером".
[Макет](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4),  в котором видно, как проект должен выглядеть, был представлен в качестве задания к работе.

**Функциональность**
- 6 карточек создаются при помощи JS;
- форма добавления карточки свёрстана, открывается, добавляет карточку;
- работает нажатие на кнопку лайка;
- удаление карточки реализовано корректно;
- модальные окна закрываются на любых разрешениях экрана;
- модальное окно с картинкой открывается, изображение не теряет пропорции;


**Использованные технологии**
Для должного реагирования элементов на изменение размера окна браузера были использованы:
 - относительные единицы измерения;
 - изменение правил CSS при определенных условиях.
Для плавного всплытия модальных окон использовались свойства "opacity", "visibility" и "transition".
Проектирование интерфейса осуществлено при помощи технологий:
 - CSS Grid Layout;
 - CSS flexbox layout.
В целях быстродействия сайта картинки оптимизированы при помощи [TinyPNG](https://tinypng.com/).
Логика реализована на JavaScript, в частности:
 - Манипуляции с классами CSS
 - Управление содержимым: свойство .textContent
 - Реакция на действия пользователя. События click
Реализовано плавное открытие и закрытие модального окна CSS-стилями.
Модальные окна свёрстаны и присутствуют в разметке, а не создаются динамически при помощи JS.

