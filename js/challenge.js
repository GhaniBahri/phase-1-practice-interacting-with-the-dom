document.addEventListener('DOMContentLoaded', e=>{
    let timer= 0
    let times = 0
    const h1Timer= document.getElementById('counter')
    const minus = document.getElementById('minus')
    const plus = document.getElementById('plus')
    const heart = document.getElementById('heart')
    const pause = document.getElementById('pause')
    const likes = document.querySelector('ul.likes')
    const input=document.getElementById('comment-input')
    const list = document.getElementById('list')
    const form = document.getElementById('comment-form')
    const reset = document.createElement('button')
    let interval= setInterval(increaseTimer, 1000)
    let paused = false

    reset.innerHTML= 'reset'
    pause.insertAdjacentElement('afterend',reset)

    function increaseTimer(){
        ++timer
        injectText(h1Timer,timer)
    }
    function decreaseTimer(){
        --timer
        injectText(h1Timer, timer)
    }
    function injectText(el,msg){
        
        el.innerText=msg
    }
    minus.addEventListener('click', decreaseTimer)

    plus.addEventListener('click', increaseTimer)

    pause.addEventListener('click', ()=>{
        paused=!paused
        if (paused){
            clearInterval(interval)
            pause.innerText= 'resume'
            Array.from(document.querySelectorAll('button')).map(btn=>{
                btn.disabled= true
            })
            pause.disabled= false
        }else{
            interval=setInterval(increaseTimer, 1000)
            pause.innerText= 'pause'
            Array.from(document.querySelectorAll('button')).map(btn=>{
                btn.disabled= false
            })
        }
    })
setInterval(()=>times=0, 1000)
    heart.addEventListener('click',()=>{
        times++;
        const msg = `${timer} has been liked ${times} times`;
        const li = document.createElement('li');
        li.id=`like-${timer}`
        injectText(li, msg);
    
        likes.appendChild(li);
        console.log('times', times);
        const items= likes.querySelectorAll(`li#like-${timer}`)
          if (items.length>0) {
            items.forEach(item=>{
                item.remove()
            })
            likes.appendChild(li)
          }
    })

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const p = document.createElement('p')
        p.innerText= input.value
        list.appendChild(p)
        input.value= ''
    })
    reset.addEventListener('click',()=>{
        timer=0
        list.innerHTML=''
        likes.innerHTML=''
    })
})