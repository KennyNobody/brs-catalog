<template>
	<div id="app">
		<section class="catalog">
			<div class="container catalog__container">
				<h2 class="catalog__title h2">
					Все
					<span class="h2--accent">вакансии</span>
				</h2>
				<div class="catalog__content">
					<div class="catalog__items">
						<article class="front-job" v-for="item in data.results" v-bind:key="item.id">
							<div class="front-job__content">
								<div class="front-job__columns">
									<div class="front-job__column front-job__column--left">
										<div class="front-job__avatar">
											<img :src="item.thumb" :alt="item.organization">
										</div>
									</div>
									<div class="front-job__column front-job__column--right">
										<p class="front-job__name">
											{{ item.organization }}
										</p>
										<div class="front-job__location">
											<svg viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.43823 0.00250112C2.00127 -0.0796255 0 1.87139 0 4.28979C0 7.03441 2.63389 9.02627 4.11019 11.8908C4.18514 12.0363 4.39451 12.0365 4.46972 11.891C5.80524 9.31351 8.08783 7.58514 8.51084 5.10199C8.94884 2.53242 7.04334 0.0903287 4.43823 0.00250112ZM4.28975 6.53679C3.04878 6.53679 2.04275 5.53074 2.04275 4.28979C2.04275 3.04885 3.0488 2.04279 4.28975 2.04279C5.53071 2.04279 6.53677 3.04885 6.53677 4.28979C6.53677 5.53074 5.53071 6.53679 4.28975 6.53679Z"/>
											</svg>
											<p class="front-job__location-text">
												Калининград
											</p>
										</div>
									</div>
								</div>
								<p class="front-job__date">
									<!-- 12 января 2019 -->
									{{$moment('2019-11-26T02:49:34.589894+02:00').format('D.M.YYYY')}}
								</p>
								<p class="front-job__title">
									{{ item.title }}
								</p>
								<p class="shedule shedule--nonfull">
									частичная занятость
								</p>
							</div>
							<div class="front-job__footer">
								<div class="front-job__btn front-job__btn--price">
									от {{ item.salary }} р
								</div>
								<a :href="'/vacancies/' + item.id" class="front-job__btn front-job__btn--more">
									<span>Подробнее</span>
									<svg viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 1L5 5L1 9" />
									</svg>
								</a>
							</div>
						</article>
						<div class="front-job--clear"></div>
					</div>
					<div class="catalog__side">
						<div class="filter-header">
							<p class="filter-header__title">
								Фильтр вакансий
							</p>
							<div class="filter-header__btn">
								<svg class="filter-header__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve">
									<path d="M41.08,48H2c-0.553,0-1,0.448-1,1s0.447,1,1,1h39.08c0.488,3.387,3.401,6,6.92,6c3.859,0,7-3.14,7-7s-3.141-7-7-7
									C44.481,42,41.568,44.613,41.08,48z"/>
									<path d="M20.695,27H2c-0.553,0-1,0.448-1,1s0.447,1,1,1h18.632c0.396,3.602,3.456,6.414,7.161,6.414s6.765-2.812,7.161-6.414H54
									c0.553,0,1-0.448,1-1s-0.447-1-1-1H34.891c-0.577-3.4-3.536-6-7.098-6S21.272,23.6,20.695,27z"/>
									<path d="M8,0C4.141,0,1,3.14,1,7s3.141,7,7,7c3.519,0,6.432-2.613,6.92-6H54c0.553,0,1-0.448,1-1s-0.447-1-1-1H14.92
									C14.432,2.613,11.519,0,8,0z"/>
								</svg>
							</div>
						</div>
						<div class="sidebar"
						v-bind:class="{ 'sidebar--|open': filter.showMenu }"
						v-on:click="filter.showMenu = !filter.showMenu"
						>
						<div
						class="sidebar__section"
						v-bind:class="{ 'sidebar__section--open': filter.dropThemes }"
						>
						<div class="sidebar__title" v-on:click="filter.dropThemes = !filter.dropThemes">
							<p>Направления</p>
							<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 6L7.4641 0H0.535898L4 6Z" fill="#252C2F"/>
							</svg>
						</div>
						<div class="sidebar__links">
							<a href="#" class="sidebar__link"
							v-for="theme in themes.results"
							v-bind:key="theme.id"
							v-on:click.prevent="selectedTheme = theme.id"
							>
							<span v-bind:class="{ 'sidebar__text--active': theme.id ==  selectedTheme}" class="sidebar__text">{{ theme.title }}</span>
						</a>
					</div>
				</div>
				<div class="sidebar__section"
				v-bind:class="{ 'sidebar__section--open': filter.dropShedule }"
				>
				<div class="sidebar__title" v-on:click="filter.dropShedule = !filter.dropShedule">
					<p>Тип занятости</p>
					<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 6L7.4641 0H0.535898L4 6Z" fill="#252C2F"/>
					</svg>
				</div>
				<div class="sidebar__links">
					<a href="#" class="sidebar__link" v-for="item in shedule" v-bind:key="item.id" v-on:click.prevent="selectedShedule = item.key">
						<span v-bind:class="{ 'sidebar__text--active': item.key == selectedShedule}" class="sidebar__text">{{ item.name }}</span>
					</a>
				</div>
			</div>
			<div class="sidebar__section"
			v-bind:class="{ 'sidebar__section--open': filter.dropCities }"
			>
			<div class="sidebar__title" v-on:click="filter.dropCities = !filter.dropCities">
				<p>Город</p>
				<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 6L7.4641 0H0.535898L4 6Z" fill="#252C2F"/>
				</svg>
			</div>
			<div class="sidebar__links">
				<a href="#" class="sidebar__link" v-for="city in cites.results" v-bind:key="city.id" v-on:click.prevent="selectedCity = city.id">
					<span v-bind:class="{ 'sidebar__text--active': city.id ==  selectedCity}" class="sidebar__text">{{ city.title }}</span>
				</a>
			</div>
			<div v-if="loading">Загружается...</div>
		</div>
	</div>
</div>
</div>
<div class="catalog__control">
	<div class="pagination" v-if="pages.pageAll > 1">
		<a href="" class="pagination__arrow pagination__arrow--prev" v-on:click.prevent="prevPage" v-bind:class="{ 'pagination__arrow--disabled': !pages.prev}">
			Назад
		</a>
		<a href="" class="pagination__link" v-on:click.prevent="pages.pageNow = index+1" v-for="(item, index) in pages.pageAll" v-bind:key="item.id" v-bind:class="{ 'pagination__link--now': index + 1 ==  pages.pageNow}">
			{{ index + 1}}
		</a>
		<a href="" class="pagination__arrow pagination__arrow--next" v-on:click.prevent="nextPage" v-bind:class="{ 'pagination__arrow--disabled': !pages.next}">
			Вперед
		</a>
	</div>
<!-- 	<div>
		Выбрано: <br>
		Направление: {{ selectedTheme }} <br>
		Расписание: {{ selectedShedule }} <br>
		Город: {{ selectedCity }} <br>
		Страницы: {{ pages.pageNow }}
	</div> -->
	<div class="to-top-block">
		<div class="to-top">
			<svg viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.0607 0.939341C12.4749 0.353554 11.5251 0.353554 10.9393 0.939341L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97918 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939341ZM13.5 20L13.5 2L10.5 2L10.5 20L13.5 20Z"/>
			</svg>
			<p class="to-top__text">
				Наверх
			</p>
		</div>
	</div>
</div>
</div>
</section>
</div>
</template>

<script>
	import Vue from 'vue';
	import moment from 'moment';
	Vue.prototype.$moment = moment;

	export default {
		name: 'app',
		data () {
			return {
				api: {
					all: '/vacancies/api/allVacancies/',
					cites: '/vacancies/api/cityVacancies/',
					themes: '/vacancies/api/themeVacancies/'
				},
				data: [],
				cites: [],
				themes: [],
				filter: {
					showMenu: false,
					dropThemes: true,
					dropShedule: false,
					dropCities: false
				},
				shedule: [
				{
					name: 'Полная',
					key: 'полная'
				},
				{
					name: 'Неполная',
					key: 'неполная'
				},
				{
					name: 'Стажировка',
					key: 'стажировка'
				}
				],
				selectedCity: '',
				selectedShedule: '',
				selectedTheme: '',
				pages: {
					pageNow: 1,
					pageAll: 4,
					prev: '',
					next: ''
				},
				loading: false
			}
		},
		methods: {
			updateList() {
				this.loading = true;
				this.$http.get(this.api.all, {
					params: {
						format: 'json',
						city: this.selectedCity,
						shedule: this.selectedShedule,
						theme: this.selectedTheme,
						limit: 1,
						offset: this.pages.pageNow - 1
					}
				})
				.then((response) => {
					this.data = response.data;
					this.pages.pageAll = response.data.count;
					// this.pages.pageNow = 1;
					this.pages.prev = response.data.previous;
					this.pages.next = response.data.next;
				})
				// .catch(error => {
				// 	this.errored = true;
				// })
				.finally(() => (this.loading = false));
			},
			nextPage () {
				if (this.pages.pageNow < this.pages.pageAll) {
					this.pages.pageNow = this.pages.pageNow + 1;
				}
			},
			prevPage () {
				if (1 < this.pages.pageNow < this.pages.pageAll) {
					this.pages.pageNow = this.pages.pageNow - 1;
				}
			}
		},
		watch: {
			selectedCity: function() {
				this.updateList();
			},
			selectedShedule: function() {
				this.updateList();
			},
			selectedTheme: function() {
				this.updateList();
			},
			actuallyPage: function () {
				this.updateList();
			}
		},
		computed: {
			actuallyPage() {
				return this.pages.pageNow;
			}
		},
		mounted() {
			//все вакансии 
			this.loading = true;
			this.$http.get(this.api.all, {
				params: {
					format: 'json',
					limit: 1,
					offset: this.pages.pageNow - 1
					// city: 1,
					// shedule: '',
					// theme: 2,
				}
			})
			.then((response) => {
				this.data = response.data;
				this.pages.pageAll = response.data.count;
				this.pages.prev = response.data.previous;
				this.pages.next = response.data.next;
			})
			// .catch(error => {
			// 	this.errored = true;
			// })
			.finally(() => (this.loading = false));

			// Список городов для вакансий
			this.loading = true;
			this.$http.get(this.api.cites, {
				params: {
					limit: 1000,
					format: 'json',
				}
			})
			.then((response) => {
				this.cites = response.data;
			})
			// .catch(error => {
			// 	this.errored = true;
			// })
			.finally(() => (this.loading = false));

			// Список направлений для вакансий
			this.loading = true;
			this.$http.get(this.api.themes, {
				params: {
					format: 'json',
					limit: 1000,
				}
			})
			.then((response) => {
				this.themes = response.data;
			})
			// .catch(error => {
			// 	this.errored = true;
			// })
			.finally(() => (this.loading = false));
		}
	}
</script>