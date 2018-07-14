<template>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      {{$t('navigation.language')}} ({{currentLanguage}}) <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li v-for="language in languages">
        <a href="#" @click.prevent="updateLanguage(language.value)">
          {{language.label}}
        </a>

      </li>

    </ul>
  </li>
</template>

<script>
  import globalTypes from './../types/global'
  import {mapActions} from 'vuex';
    export default {
      name: "language-selector",
      data() {
        return {
          selected_language: 'es',
          languages : [
            {value: 'es', label: 'Español'},
            {value: 'en', label: 'English'},
            {value: 'fr', label: 'Français'},
          ]
        }
      },
      methods: {
        ...mapActions({
          setLanguage: globalTypes.actions.changeLanguage
        }),
        updateLanguage(language) {
          this.selected_language = language;
          this.setLanguage(this.selected_language);
          this.$i18n.locale = this.selected_language;
        }
      },
      computed: {
        currentLanguage () {
          return this.languages.filter(language => language.value === this.selected_language)[0].label;
        }
      }
    }
</script>

<style scoped>

</style>
