class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.lastfed;
        this.image = loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock       
    }

    getFeedTime(lastFed)
    {
        this.lastfed = lastFed
    }

    deductFood()
    {
        if(this.foodStock > 0)
        {
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    bedroom()
    {
        imageMode(CENTER);
        background(bedRoom, 250, 400);

        feed.hide();
        add.hide();
        vet.hide();
        vaccine.hide();
        home.hide()

        dog.remove();
        bowls.remove();
    }

    livingroom()
    {
        imageMode(CENTER);
        background(livingRoom, 250, 400);

        feed.hide();
        add.hide();
        vet.hide();
        vaccine.hide();
        home.hide()

        dog.remove();
        bowls.remove();
    }

    washroom()
    {
        imageMode(CENTER);
        background(bathRoom, 250, 400);

        feed.hide();
        add.hide();
        vet.hide();
        vaccine.hide();
        home.hide()

        dog.remove();
        bowls.remove();
    }

    garden()
    {
        //imageMode(CENTER);
        background(gardenI, 500, 800);

        feed.hide();
        add.hide();
        vet.hide();
        vaccine.hide();
        home.hide()

        dog.remove();
        bowls.remove();
    }

    dead()
    {
        background(46, 139, 87);

        feed.hide();
        add.hide();
        vet.hide();
        vaccine.hide();
        home.hide()
        bowls.remove();

        dog.addImage(deadDog);
    }

    display()
    {
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        //image(this.image, 720, 220, 70, 70)

        if (this.foodStock !== 0 && gameState === "hungry")
        {
            for(var m = 0; m < this.foodStock; m++)
            {
                if(m % 10 === 0)
                {
                    x = 80;
                    y = y + 50;
                }   

                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}