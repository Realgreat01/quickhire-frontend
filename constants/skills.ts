import { computed, reactive } from 'vue';
interface tool {
  name: string;
  icon: string;
}
interface framework {
  language: string;
  frameworks: tool[];
}

export const frameworks: framework[] = reactive([
  {
    language: 'JavaScript',
    frameworks: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Vue', icon: 'devicon-vuejs-plain' },
      { name: 'Svelte', icon: 'devicon-svelte-plain' },
      { name: 'Angular', icon: 'devicon-angularjs-plain' },
      { name: 'Next.js', icon: 'devicon-nextjs-original' },
      { name: 'Nuxt.js', icon: 'devicon-nuxtjs-plain' },
      { name: 'Gatsby', icon: 'devicon-gatsby-plain' },
      { name: 'Ember', icon: 'devicon-ember-original-wordmark' },
      { name: 'Backbone', icon: 'devicon-backbonejs-plain' },
      { name: 'Alpine.js', icon: 'devicon-alpinejs-plain' },
      { name: 'Meteor', icon: 'devicon-meteor-plain' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'Feathers', icon: 'devicon-feathersjs-plain' },
      { name: 'Koa', icon: 'devicon-koa-plain' },
      { name: 'Polymer', icon: 'devicon-polymer-plain' },
      { name: 'Aurelia', icon: 'devicon-aurelia-plain' },
      { name: 'Hyperapp', icon: 'devicon-hyperapp-plain' },
      { name: 'Stimulus', icon: 'devicon-stimulus-plain' },
      { name: 'Mithril', icon: 'devicon-mithril-plain' },
      { name: 'Preact', icon: 'devicon-preact-plain' },
    ],
  },
  {
    language: 'Java',
    frameworks: [
      { name: 'Spring', icon: 'devicon-spring-plain' },
      { name: 'Hibernate', icon: 'devicon-hibernate-plain' },
      { name: 'Struts', icon: 'devicon-struts-plain' },
      { name: 'Grails', icon: 'devicon-grails-plain' },
      { name: 'Vaadin', icon: 'devicon-vaadin-plain' },
      { name: 'Apache Camel', icon: 'devicon-apachecamel-plain' },
      { name: 'Dropwizard', icon: 'devicon-dropwizard-plain' },
    ],
  },
  {
    language: 'Python',
    frameworks: [
      { name: 'Django', icon: 'devicon-django-plain' },
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Pyramid', icon: 'devicon-pyramid-plain' },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
      { name: 'Tornado', icon: 'devicon-tornado-plain' },
    ],
  },
  {
    language: 'PHP',
    frameworks: [
      { name: 'Laravel', icon: 'devicon-laravel-plain' },
      { name: 'Symfony', icon: 'devicon-symfony-original' },
      { name: 'CodeIgniter', icon: 'devicon-codeigniter-plain' },
      { name: 'Zend Framework', icon: 'devicon-zend-plain' },
      { name: 'Phalcon', icon: 'devicon-phalcon-plain' },
      { name: 'CakePHP', icon: 'devicon-cakephp-plain' },
    ],
  },
  {
    language: 'Ruby',
    frameworks: [
      { name: 'Rails', icon: 'devicon-rails-plain' },
      { name: 'Sinatra', icon: 'devicon-sinatra-original' },
      { name: 'Hanami', icon: 'devicon-hanami-plain' },
    ],
  },
  {
    language: 'C#',
    frameworks: [
      { name: 'ASP.NET', icon: 'devicon-dotnetcore-plain' },
      { name: 'Blazor', icon: 'devicon-blazor-plain' },
      { name: 'Xamarin', icon: 'devicon-xamarin-plain' },
    ],
  },
  {
    language: 'Go',
    frameworks: [
      { name: 'Gin', icon: 'devicon-gin-plain' },
      { name: 'Beego', icon: 'devicon-beego-plain' },
      { name: 'Echo', icon: 'devicon-echo-plain' },
    ],
  },
  {
    language: 'Rust',
    frameworks: [
      { name: 'Actix', icon: 'devicon-actix-plain' },
      { name: 'Rocket', icon: 'devicon-rocket-plain' },
      { name: 'Tide', icon: 'devicon-tide-plain' },
    ],
  },
  {
    language: 'Swift',
    frameworks: [
      { name: 'Vapor', icon: 'devicon-vapor-plain' },
      { name: 'Kitura', icon: 'devicon-kitura-plain' },
      { name: 'Perfect', icon: 'devicon-perfect-plain' },
    ],
  },
  {
    language: 'C++',
    frameworks: [
      { name: 'Qt', icon: 'devicon-qt-plain' },
      { name: 'Boost', icon: 'devicon-boost-plain' },
      { name: 'Poco', icon: 'devicon-poco-plain' },
    ],
  },
]);

export const programmingLanguages: tool[] = reactive([
  { name: 'HTML', icon: 'devicon-html5-plain' },
  { name: 'CSS', icon: 'devicon-css3-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'PHP', icon: 'devicon-php-plain' },
  { name: 'Go', icon: 'devicon-go-plain' },
  { name: 'Java', icon: 'devicon-java-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'C++', icon: 'devicon-cplusplus-plain' },
  { name: 'C#', icon: 'devicon-csharp-plain' },
  { name: 'Carbon', icon: '' },
  { name: 'Ruby', icon: 'devicon-ruby-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Swift', icon: 'devicon-swift-plain' },
  { name: 'Kotlin', icon: 'devicon-kotlin-plain' },
  { name: 'Objective-C', icon: 'devicon-objectivec-plain' },
  { name: 'Scala', icon: 'devicon-scala-plain' },
  { name: 'Perl', icon: 'devicon-perl-plain' },
  { name: 'Lua', icon: 'devicon-lua-plain' },
  { name: 'Groovy', icon: 'devicon-groovy-plain' },
  { name: 'R', icon: 'devicon-r-plain' },
  { name: 'Dart', icon: 'devicon-dart-plain' },
  { name: 'Elixir', icon: 'devicon-elixir-plain' },
  { name: 'F#', icon: 'devicon-fsharp-plain' },
  { name: 'Clojure', icon: 'devicon-clojure-plain' },
  { name: 'Haskell', icon: 'devicon-haskell-plain' },
  { name: 'Rust', icon: 'devicon-rust-plain' },
  { name: 'Julia', icon: 'devicon-julia-plain' },
  { name: 'Erlang', icon: 'devicon-erlang-plain' },
  { name: 'Bash', icon: 'devicon-bash-plain' },
  { name: 'PowerShell', icon: 'devicon-powershell-plain' },
  { name: 'MATLAB', icon: 'devicon-matlab-plain' },
  { name: 'Scheme', icon: 'devicon-scheme-plain' },
  { name: 'Prolog', icon: 'devicon-prolog-plain' },
  { name: 'Fortran', icon: 'devicon-fortran-plain' },
  { name: 'Ada', icon: 'devicon-ada-plain' },
  { name: 'COBOL', icon: 'devicon-cobol-plain' },
  { name: 'Assembly Language', icon: 'devicon-assembly-plain' },
  { name: 'VHDL', icon: 'devicon-vhdl-plain' },
  { name: 'Verilog', icon: 'devicon-verilog-plain' },
  { name: 'Delphi', icon: 'devicon-delphi-plain' },
  { name: 'Elm', icon: 'devicon-elm-plain' },
  { name: 'Smalltalk', icon: 'devicon-smalltalk-plain' },
  { name: 'Common Lisp', icon: 'devicon-commonlisp-plain' },
  { name: 'Racket', icon: 'devicon-racket-plain' },
  { name: 'Pascal', icon: 'devicon-pascal-plain' },
  { name: 'VBA', icon: 'devicon-vba-plain' },
  { name: 'OCaml', icon: 'devicon-ocaml-plain' },
  { name: 'ABAP', icon: 'devicon-abap-plain' },
  { name: 'Scratch', icon: 'devicon-scratch-plain' },
  { name: 'Solidity', icon: 'devicon-solidity-plain' },
]);

export const allTools = computed(() => {
  const data = frameworks.map((value) => value.frameworks.map((val) => val));
  return data.flat().concat(programmingLanguages);
});

console.log(allTools.value);
