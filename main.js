document.addEventListener('DOMContentLoaded',()=>{

    let board_size = 3,
        current_turn,
        moves
        boxes = [],
        EMPTY = "&nbsp;"
    
    function init(){

        let board = document.createElement('table')
        let identifier = 1;

        for(r = 0; r < board_size; r++){
            let row = document.createElement('tr')
            board.appendChild(row)
            for(c = 0; c < board_size; c++){
                let cell = document.createElement('td')
                cell.setAttribute('width',150)
                cell.setAttribute('height',150)
                cell.setAttribute('align','center')

                if(r === c){
                    cell.classList.add('diagonal0');
                }

                if(c === board_size - r - 1){
                    cell.classList.add('diagonal1');
                }

                cell.classList.add('row'+ r, 'cell' + c )
                cell.identifier = identifier
                row.appendChild(cell)
                cell.addEventListener('click',set)
                boxes.push(cell)
                identifier += identifier

            }
        }

        document.querySelector('#container').appendChild(board)
        startGame();
    }
    init();


    function startGame(){
        
        current_turn = "X"
        moves = 0;

        boxes.forEach(element => {
            element.innerHTML = EMPTY
        });
    }


    function set(){
        if(this.innerHTML != EMPTY){
            return 
        }
        
        this.innerHTML = current_turn
        moves += 1

        if(win(this)){
            alert('Player ' + current_turn + ' wins')
            startGame();
        }else if( moves === board_size * board_size){
            alert('Draw')
            startGame()
        }else{
           current_turn = current_turn === "X" ? "O" : "X"
        }
    }

    function win(selector){
        
        let classList = selector.className.split(/\s+/)
        for(i = 0; i< classList.length;i++){
            
            let items = contains('#container .'+ classList[i],current_turn )
            if(items.length >= board_size){
                return true
            }
        }

        return false

    }
    function contains(select,text){
        const allClass = document.querySelectorAll(select)
        return [].filter.call(allClass,(allClass)=>{
            return RegExp(text).test(allClass.textContent)
        })

    }


})