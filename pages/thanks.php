<!DOCTYPE html>
<html lang="ru-RU">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Спасибо за заявку!</title>
        <?php include '../blocks/header.php';?>
    </head>
    <body>
        <main class="content thanks">
            <section class="thanks-block">
                <div class="container">
                    <div class="thanks-block__container">
                        <div class="info">
                            <div class="title">
                                Спасибо за заявку!
                            </div>
                            <div class="description">
                                Мы свяжемся с Вами в самое ближайшее время
                            </div>
                        </div>
                        <a href="/" class="btn btn--white">На главную страницу</a>
                        <div class="thanks__image">
                            <picture>
                                <source media="(max-width: 1199px)" srcset="../assets/images/thanks-1-mobile.webp">
                                <source media="(max-width: 1200px)" srcset="../assets/images/thanks-1.webp">
                                <img src="../assets/images/thanks-1.webp" alt="Теплицы из поликарбоната и стекла">
                            </picture>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    <?php include '../blocks/footer.php';?>
    </body>
</html>