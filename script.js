var SelectedItem


var Shop = []
let Newitem = function (jmeno, ItemID, cena) {
    let item = {
        name: jmeno, IDItem: ItemID, cost: cena
    }
    item.ShopedIname = function (i) {
        return this.name
    }
    Shop.push(item)
}


function Creatin() {
    Newitem("Sonoff T1EU1C-TX",0,450)
    Newitem("Sonoff T1EU2C - TX",1,500)
    Newitem("FIBARO Walli Zaluziovy", 2, 1600)
    ShopPaggin()
}
function ShopPaggin() {
    const AllItemOnShop = document.getElementById("ShopItems")
   
    AllItemOnShop.innerHTML=""
    for (var i = 0; i < Shop.length; i++) {
        let opt = document.createElement("option")
        opt.value = `${Shop[i].name}`
        opt.id = i

        AllItemOnShop.appendChild(opt)
    }
    console.log(Shop)
}

Creatin()
var ShopingCard = []



///otevrent overlay
function OverleyOn(ID) {
    document.getElementById(ID).style.display = "block";
}


function OverleyOff(ID) {
    document.getElementById(ID).style.display = "none";
}

function AddShopingItem() {

    console.log(SelectedItem)
    if (ShopingCard.length == 0){
        ShopingCard.push({ Shoped: SelectedItem, meny: 1 })
        console.log(ShopingCard)
        document.getElementById("ShopedINPUT").value = ""
        console.log(ShopingCard)
        WriteToShoppingList()
    }
    else {
        console.log(SelectedItem)
    for (var i = 0; i < ShopingCard.length; i++) {
        console.log(i + " / " + (ShopingCard.length))
        if (ShopingCard[i] != null) {
            if (ShopingCard[i].Shoped.IDItem == SelectedItem.IDItem) {
                ShopingCard[i].meny++

                console.log(ShopingCard)
                document.getElementById("ShopedINPUT").value = ""
                i = ShopingCard.length
                WriteToShoppingList()

            }
            else {
                if (i == (ShopingCard.length - 1)) {
                    ShopingCard.push({ Shoped: SelectedItem, meny: 1 })
                    document.getElementById("ShopedINPUT").value = ""
                    WriteToShoppingList()

                }
                else { }

            }
        }
        else {}
        

        }
    }
    


}

function WriteToShoppingList() {


    const shoped = document.getElementById("ShoppingCard")

    shoped.innerHTML = ""
    for (var i = 0; i < ShopingCard.length; i++) {
        if (ShopingCard[i] != null) {
            let div = document.createElement("div")
            const nameItem = `<p>${ShopingCard[i].Shoped.name}</p>`
            const input = document.createElement("input")
            let button = document.createElement("button")

            input.type = "number"
            input.min = 0
            input.value = ShopingCard[i].meny
            input.id = i
            input.placeholder = "pocet objednanych produktu"
            input.addEventListener("change", function () {
                ShopingCard[this.id].meny = this.value
                Finish_cost()
            })

            button.textContent = "ODEBRAT Z KOSIKU"
            button.id = i
            button.addEventListener("click",
                function () {
                    ShopingCard[this.id] = null
                    WriteToShoppingList()
                })
            console.log(ShopingCard[i].name)
            div.innerHTML = nameItem
            div.appendChild(input)
            div.appendChild(button)

            div.style.border ="solid black 2px"
            
            shoped.appendChild(div)
        }
        else {
        }
        
    }
    
}


document.getElementById("ShopedINPUT").addEventListener("change", function () {
    for (var i = 0; i < Shop.length; i++) {

        if (document.getElementById("ShopedINPUT").value === Shop[i].name) {
            SelectedItem = Shop[i]
            const ShopedValue = document.getElementById("CostITEM")
            
            ShopedValue.innerHTML = `${SelectedItem.name} za cenu ${SelectedItem.cost}czk`

            
        }
    }

})


function Finish_cost() {
    let finish_cost = 0
    for (var i = 0; i < ShopingCard.length; i++) {
        if (ShopingCard[i]===null) {

        }else
        finish_cost = finish_cost + (ShopingCard[i].meny * ShopingCard[i].Shoped.cost)
    }
    const a = document.getElementsByClassName("COST")
    for (var i = 0; i < a.length; i++) {
        a[i].innerHTML = `${finish_cost}czk`
    }
}
