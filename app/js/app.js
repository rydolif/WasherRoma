'use strict';

document.addEventListener("DOMContentLoaded", function() {

	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelector('.' + wrap);
					let close = item.querySelector('.close');
					if (link) {
						link.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.classList.remove('active');
						}
					});
				});
			}

		};
		modals('.modal');

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;
			let img = 1;
			let lebel = 1;
			let prev = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();
			
					let error = formValidate(item);
			
					let formData = new FormData(item);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});
			
						if (response.ok) {
							let modalThanks = document.querySelector('#modal__thanks');
							formParent.parentNode.style.display = 'none';

							modalThanks.classList.add('active');
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Ошибка при отправке');
							item.classList.remove('_sending');
						}
			
					}
				}
			
				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
			
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}

				const formImgFile = formParent.querySelectorAll('.formImgFile');

				formImgFile.forEach(item => { 
					const elem = 'formImgFile--' + i++;

					let formId = item.id = (elem);
					let formParent = document.querySelector('#' + formId);

					const formImage = formParent.querySelector('.formImage');
					const formLebel = formParent.querySelector('.formLebel');
					const formPreview = formParent.querySelector('.formPreview');

					//картинка в форме
					let formImageNumber = 'formImage--' + img++;
					let formPreviewNumber = 'formPreview--' + prev++;
					
					formImage.id = (formImageNumber);
					formLebel.htmlFor = ('formImage--' + lebel++);
					formPreview.id = (formPreviewNumber);
					const formImageAdd = document.querySelector('#' + formImageNumber);

					// изменения в инпуте файл
					formImageAdd.addEventListener('change', () =>  {
						uploadFile(formImage.files[0]);
					});

					function uploadFile(file) {
				
						if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico', 'application/pdf'].includes(file.type)) {
							alert('Только изображения');
							formImage.value = '';
							return;
						}
				
						if (file.size > 2 * 1024 * 1024) {
							alert('Размер менее 2 мб.');
							return;
						}
				
						var reader = new FileReader();
						reader.onload = function (e) {
							if(['application/pdf'].includes(file.type)) {
								formPreview.innerHTML = `Файл выбран`;
							}else{
								formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
							}
							
						};
						reader.onerror = function (e) {
							alert('Ошибка');
						};
						reader.readAsDataURL(file);
					}
				})

				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите данные в поле";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите свою почту";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}

				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Согласие на обработку персональных данных";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
			
				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');

});
	