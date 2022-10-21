import '~/app/libs/custom-select.min.js'

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // apply btn click
    const btn = document.querySelector('#button-apply');
    const radioButtons = document.querySelectorAll('input[name="theme"]');
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let radioButtonValue;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                radioButtonValue = radioButton.value;
                break;
            }
        }

        if(radioButtonValue === 'dark-theme'){
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.removeItem('theme');
        }
    });

    // тема сохраняется при обновлении страницы
    if(localStorage.getItem('theme') === 'dark-theme'){
        document.body.classList.add('dark-theme');

        radioButtons.forEach(radioButton => {
            if(radioButton.hasAttribute('id', 'dark-theme')){
                radioButton.setAttribute("checked", "");
            } else {
                radioButton.removeAttribute("checked", "");
            }
        });
    }

    // значения полей сохраняются при обновлении страницы
    if (window.localStorage) {
        const elements = document.querySelectorAll('input[name][type=text], select[name]');

        for (let i = 0, length = elements.length; i < length; i++) {
            (function(element) {
                const name = element.getAttribute('name');

                if( element.value && !localStorage.getItem('is_saved') ){
                    localStorage.setItem(name, element.value);
                }
                element.value = localStorage.getItem(name) || '';

                if(element.tagName === 'INPUT'){
                    element.onkeyup = function() {
                        localStorage.setItem(name, element.value);
                    };
                }

                if(element.tagName === 'SELECT'){
                    element.onchange = function() {
                        localStorage.setItem(name, element.value);
                    };
                }

            })(elements[i]);
        }
    }
    localStorage.setItem('is_saved', '1');

    // customSelect
    customSelect('select');
    const customSelects = document.querySelectorAll('.customSelect');
    customSelects.forEach(customSelect => {
        customSelect.querySelector('.custom-select-opener').insertAdjacentHTML('beforeend', '<svg width="12" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.41.58 6 5.17 10.59.58 12 2 6 8 0 2 1.41.58Z" fill="#887C7C"/></svg>');
    });

})
