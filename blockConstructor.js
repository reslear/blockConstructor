/*jshint browser: true*/

/*!
    ---
    скрипт: blockConstructor v0.1 ~ Февраль 2016
    автор : ReSLeaR- (Korchevskiy Evgeniy)
    ---
    vk.com/reslear | upost.su | github.com/reslear
    ---
    @license CC BY

!*/

    // data-bc

    var blockConstructor = (function () {

        var SELECTOR = false;
        var BLOCK_MN = false;

        var utils = {

            setAttributes: function (el, attrs) {
                for(var key in attrs) {
                    el.setAttribute(key, attrs[key]);
                }
            }
        };

        /* Работа с элемента на поле */
        var events = {

            list: {
                blur: function() {
                    this.parentNode.removeAttribute('bm-focus');

                },
                focus: function(){

                    this.parentNode.setAttribute('bm-focus','');

                },
                keydown: function( event ) {

                    if( this.getAttribute('bm-tag') == 'code' ) {

                        if( event.keyCode == 9 ){
                            document.execCommand('insertHTML', false, '&#009');
                            event.preventDefault();
                        }
                    }

                }
            },

            init: function() {

                var editable = document.querySelectorAll( SELECTOR + ' [contenteditable]');
                var eventsList = this.list;

                [].forEach.call(editable, function(item) {

                    for(var key in eventsList ) {
                        item.addEventListener(key, eventsList[key]);
                    }

                });


            }
        };


        // Функция парсинга элементов

        var render = {

            recursive: function( item ){

                // выходим, если уже прорисовали или узел игнорный
                if( item.getAttribute('bm_render') === '' || item.getAttribute('bm_ignore') === '' ){
                    return;
                }


                if( item.children.length ) {

                    render.init( item );

                    utils.setAttributes(item, { bm_parent : '' });

                } else {

                    var child = document.createElement('div');

                    child.innerHTML = item.innerHTML;

                    utils.setAttributes(child, {contenteditable: '', 'class': 'bm-child' });



                    item.innerHTML = child.outerHTML;

                }



                utils.setAttributes(item, { bm_render : '', bm_tag : item.tagName.toLowerCase()  });



            },

            init: function( parent){
                [].forEach.call(parent.children, render.recursive );
            }

        };


        return {
            init: function( selector ) {

                SELECTOR = selector || '.block-manager';
                BLOCK_MN = document.querySelector( SELECTOR );


                /* Запускаем рендер */
                render.init( BLOCK_MN, 0 );


                /* Биндимм */
                events.init();
            }
        };

    })();

    blockConstructor.init();
