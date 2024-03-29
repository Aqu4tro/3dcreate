import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {modificaebaixa} from './envia.js'
 const lista = document.querySelector('.lista')
const listagem = document.querySelector('.listagem');
const ul = document.createElement('ul')
ul.className='tor';
const save = document.querySelector('.save');
const up = document.querySelector('.upload');
const down = document.querySelector('.download');
const novogrupo = []
var obj = new Object()
var vou = 0
var manop = []
var envia = []
var materiais = []
var novo = []
var teto = []
const obs = []
const final = []
const adicionais = []
//ul.style.backgroundColor='blue';
const grupo = [];
const grupoadiciona = [];
const grupin = [];
const mudanca = [];

const inputFile = document.querySelector("#ar");
        const pictureImage = document.querySelector(".imagem");
        const pictureImageTxt = "Escolha uma imagem ";
        pictureImage.innerHTML = pictureImageTxt;
const fil = document.querySelector('#fil');
const texture = document.querySelector('.newtexture');

fil.addEventListener('change', function(e){
  
  const inputTarget = this.files[0];
  
   if(inputTarget){
    const reader = new FileReader();
    reader.addEventListener('load', (j)=>{
      //reader.readAsText(inputTarget)
      const rail = j.target;
      console.log(rail.result)
      texture.src = rail.result;
                
    })
    reader.readAsDataURL(inputTarget);
            
            
  } else {
      pictureImage.innerHTML = pictureImageTxt;
  }
  });
    


inputFile.addEventListener('change', function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', function (j) {
                const readerTarget = j.target;

                pictureImage.src = readerTarget.result;
                
                });

            reader.readAsDataURL(file);
            
            
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
        });

document.querySelector('#novo').addEventListener('click',()=>{
  var x = document.querySelector('.criar')
  x.style.display='block'
})
document.querySelector('#cancelar').addEventListener('click',() => {
  var x = document.querySelector('.criar')
  x.style.display='none'
})
document.querySelector('#aceitar').addEventListener('click',() => {
  
  
  let nomi = document.getElementById('nomi').value
  let climb = ['x','y','z']
  let piso = ['y','espessura']
  let p = []
  let di = []
  let pi = []
  
  for(var i = 0;i < document.getElementsByClassName('mir').length;i++){
    console.log((document.getElementsByClassName('mir')[i]).value)
    
  di.push({[climb[i]]:parseFloat((document.getElementsByClassName('mir')[i]).value)})

  }
  novo.push({dimensoes:di})
  
  for(var i = 0;i < document.getElementsByClassName('mer').length;i++){
    p.push({[climb[i]]:parseFloat((document.getElementsByClassName('mer')[i]).value)})
  
    console.log((document.getElementsByClassName('mer')[i]).value)
  }
  novo.push({posicao:p})
  
  novo.push({'material':pictureImage.src})
  novo.push({'cor':(document.getElementById('paleta').value)})

  for(var i = 0; i< document.getElementsByClassName('mar').length;i++){
    pi.push({[piso[i]]:parseFloat((document.getElementsByClassName('mar')[i]).value)})
    console.log((document.getElementsByClassName('mar')[i]).value)
  }
  novo.push({piso:pi})
  
  
  var lonzo = { [nomi] : novo}
  novogrupo.push(lonzo)
  console.log(novo)
  novo = []
  console.log(grupo)
  obj.blocos = (novogrupo)
  console.log(novogrupo)
  obs.push(obj)
  console.log(obj)
  console.log(final)
  
  
  adiciona(JSON.stringify(obj))
  
})


listagem.appendChild(ul);



function porque(x) {
  console.log(novogrupo)
  ul.innerHTML = ''
      
      let bloc = new Object();
      bloc = JSON.parse(x)
      
      console.log(bloc['blocos'])
      
      bloc['blocos'].forEach(objeto => {
        Object.keys(objeto).forEach(chave => {
          
          
          
          const div = document.createElement('div');
          
          const nome = document.createElement('div');
          const conectivo = document.createElement('div')
          conectivo.className='conecta'
          nome.className='titulo'
          grupo.push(chave)
          nome.textContent = chave ;
          conectivo.textContent = ':'
          ul.appendChild(div);
          div.className = 'bloco'
          
          const subdiv = document.createElement('div');
          const subdasubum = document.createElement('div')
          
          const subdasubdois = document.createElement('div')
          subdasubum.className='divum'
          subdasubdois.className='divoes'

        

          objeto[chave].forEach(dimensoes => {
            
            Object.keys(dimensoes).forEach(main => {
              
              materiais.push(dimensoes['cor'],dimensoes['material'])
              if (typeof dimensoes['cor'] === 'string'){
                console.log(dimensoes['cor'])
                
              }
              
              const spanc = document.createElement('input');
              spanc.type = 'color';

              const spanm = document.createElement('img');
              //const imgm = document.createElement('img')
              //imgm.className = 'campo'
              
              spanc.className='corzinha';
              
              
              
              spanm.className = 'campo';
              
              
              
              
              if ( main === 'dimensoes'){
                let pos = ['x','y','z']
                let dim = document.createElement('div')
                dim.className = 'dois'
                Object.keys(dimensoes[main]).forEach(espaco => {
                  pos.forEach(valor => {
                  
                    if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                      console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                      let one = document.createElement('input')
                      one.type='number'
                      one.className='intel'
                      one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                      dim.appendChild(one)
                      
                      manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                      
                      grupo.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                      console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                  }
                  
                  })
                  
                }
                )
                
                subdasubum.appendChild(dim)  
                
                
              }
              if ( main === 'posicao'){
                let pos = ['x','y','z']
                let dim = document.createElement('div')
                dim.className = 'dois'
                Object.keys(dimensoes[main]).forEach(espaco => {
                  pos.forEach(valor => {
                  
                    if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                      console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                      let one = document.createElement('input')
                      one.type='number'
                      one.className='intel'
                      one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                      dim.appendChild(one)
                      
                      manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                      
                      grupo.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                      console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                  }
                  
                  })
                  
                }
                )
                
                subdasubum.appendChild(dim)  
                
                
              }
              if ( main === 'piso'){
                let pos = [,'y','espessura']
                let dim = document.createElement('div')
                dim.className = 'dois'
                Object.keys(dimensoes[main]).forEach(espaco => {
                  pos.forEach(valor => {
                  
                    if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                      console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                      let one = document.createElement('input')
                      one.type='number'
                      one.className='intel'
                      one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                      dim.appendChild(one)
                      
                      manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                      
                      grupo.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                      console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                  }
                  
                  })
                  
                }
                )
                
                subdasubum.appendChild(dim)  
                
                
              }
              if (typeof dimensoes['cor'] === 'string'){
                spanc.value = (dimensoes['cor']);
                subdasubdois.appendChild(spanc);
              
                grupo.push(  dimensoes['cor'])
              }
              if (typeof dimensoes['material'] === 'string'){
                spanm.src = (dimensoes['material']);
                subdasubdois.appendChild(spanm);
                grupo.push(  dimensoes['material'])
              }
              
            })
          });
         
          
          console.log(grupo)
          subdiv.appendChild(subdasubum);
          subdiv.appendChild(subdasubdois);
          div.appendChild(nome);
          div.appendChild(conectivo)
          div.appendChild(subdiv);
          subdiv.className = 'star';


          grupo.forEach((manu) => {
            if (typeof manu === 'string' || typeof manu === 'number'){
              console.log(manu)
            }
  
    
            
            
          
          })
          
        });

      });
      grupin.push(grupo)
      
    }

    function adiciona(x) {
      let l = [final,obj]
      console.log(l)
      
          ul.innerHTML = ''
        
          console.log(final)
          console.log(x)
          
          let bloc = new Object();
          bloc = JSON.parse(x)
          console.log(bloc['blocos'])
          
          bloc['blocos'].forEach(objeto => {
            Object.keys(objeto).forEach(chave => {
              
              
              
              const div = document.createElement('div');
              
              const nome = document.createElement('div');
              const conectivo = document.createElement('div')
              conectivo.className='conecta'
              nome.className='titulo'
              grupoadiciona.push(chave)
              nome.textContent = chave ;
              conectivo.textContent = ':'
              ul.appendChild(div);
              div.className = 'bloco'
              
              const subdiv = document.createElement('div');
              const subdasubum = document.createElement('div')
              
              const subdasubdois = document.createElement('div')
              subdasubum.className='divum'
              subdasubdois.className='divoes'
    
            
    
              objeto[chave].forEach(dimensoes => {
                
                Object.keys(dimensoes).forEach(main => {
                  
                  materiais.push(dimensoes['cor'],dimensoes['material'])
                  if (typeof dimensoes['cor'] === 'string'){
                    console.log(dimensoes['cor'])
                    
                  }
                  
                  const spanc = document.createElement('input');
                  spanc.type = 'color';
    
                  const spanm = document.createElement('img');
                  //const imgm = document.createElement('img')
                  //imgm.className = 'campo'
                  
                  spanc.className='corzinha';
                  
                  
                  
                  spanm.className = 'campo';
                  
                  console.log(dimensoes['teto'])
                  
                  if (main === 'teto'){
                    
                    let vasco = ['x','y','z']
                    Object.keys(dimensoes[main]).forEach(e => {
                      console.log(e)
                    let all = ['inclinacao','tamanho','ativo']
                    all.forEach(j => {
                      if(typeof dimensoes[main][e][j] !== 'undefined' && j !== 'tamanho'){
                        teto.push(dimensoes[main][e][j])
                        console.log(dimensoes[main][e][j])
                      }
                      if(j === 'tamanho' && typeof dimensoes[main][e][j] !== 'undefined'){
                        Object.keys(dimensoes[main][e][j]).forEach(z => { 
                          vasco.forEach( v => {
                            if (typeof dimensoes[main][e][j][z][v] !== 'undefined'){
                              teto.push(dimensoes[main][e][j][z][v])
                              console.log(dimensoes[main][e][j][z][v])}
                            }
                          )
                        
                          })
                          
                      }
                      
                    })
                    console.log(teto)
                    })
                  }
                  if (main === 'aderecos'){
                    
                    let vasco = ['dim','ps','m']
                    Object.keys(dimensoes[main]).forEach(e => {
                      Object.keys(dimensoes[main][e]).forEach(f => {
                        console.log(dimensoes[main][e][f])
                        Object.keys(dimensoes[main][e][f]).forEach(func => {
                          vasco.forEach(j => {
                            console.log((dimensoes[main][e][f][func]))
                            if (typeof dimensoes[main][e][f][func][j] !== 'undefined'){
                              teto.push(dimensoes[main][e][f][func][j])
                              console.log(dimensoes[main][e][f][func][j])}

                          })
                        })
                        
                      })
                      
                      
                    
                    
                    console.log(teto)
                      
                    
                    })
                  }
                  
                  if ( main === 'dimensoes'){
                    let pos = ['x','y','z']
                    let dim = document.createElement('div')
                    dim.className = 'dois'
                    Object.keys(dimensoes[main]).forEach(espaco => {
                      pos.forEach(valor => {
                      
                        if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                          console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                          let one = document.createElement('input')
                          one.type='number'
                          one.className='intel'
                          one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                          dim.appendChild(one)
                          
                          manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                          
                          grupoadiciona.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                          console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                      }
                      
                      })
                      
                    }
                    )
                    
                    subdasubum.appendChild(dim)  
                    
                    
                  }
                  if ( main === 'posicao'){
                    let pos = ['x','y','z']
                    let dim = document.createElement('div')
                    dim.className = 'dois'
                    Object.keys(dimensoes[main]).forEach(espaco => {
                      pos.forEach(valor => {
                      
                        if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                          console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                          let one = document.createElement('input')
                          one.type='number'
                          one.className='intel'
                          one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                          dim.appendChild(one)
                          
                          manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                          
                          grupoadiciona.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                          console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                      }
                      
                      })
                      
                    }
                    )
                    
                    subdasubum.appendChild(dim)  
                    
                    
                  }
                  if ( main === 'piso'){
                    let pos = [,'y','espessura']
                    let dim = document.createElement('div')
                    dim.className = 'dois'
                    Object.keys(dimensoes[main]).forEach(espaco => {
                      pos.forEach(valor => {
                      
                        if (typeof dimensoes[main][espaco][valor] !== 'undefined'){
                          console.log(JSON.stringify(dimensoes[main][espaco][valor]))
                          let one = document.createElement('input')
                          one.type='number'
                          one.className='intel'
                          one.value=parseFloat(JSON.stringify(dimensoes[main][espaco][valor]))
                          dim.appendChild(one)
                          
                          manop.push(parseFloat(JSON.stringify(dimensoes[main][espaco])[5]))
                          
                          grupoadiciona.push(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])) )
                          console.log(parseFloat(JSON.stringify(dimensoes[main][espaco][valor])))
                      }
                      
                      })
                      
                    }
                    )
                    
                    subdasubum.appendChild(dim)  
                    
                    
                  }
                  if (typeof dimensoes['cor'] === 'string'){
                    spanc.value = (dimensoes['cor']);
                    subdasubdois.appendChild(spanc);
                  
                    grupoadiciona.push(  dimensoes['cor'])
                  }
                  if (typeof dimensoes['material'] === 'string'){
                    spanm.src = (dimensoes['material']);
                    subdasubdois.appendChild(spanm);
                    grupoadiciona.push(  dimensoes['material'])
                  }
                  
                })
              });
             
              
              console.log(grupoadiciona)
              subdiv.appendChild(subdasubum);
              subdiv.appendChild(subdasubdois);
              div.appendChild(nome);
              div.appendChild(conectivo)
              div.appendChild(subdiv);
              subdiv.className = 'star';
    
    
              grupoadiciona.forEach((manu) => {
                if (typeof manu === 'string' || typeof manu === 'number'){
                  console.log(manu)
                }
      
        
                
                
              
              })
              
            });
    
          });
          grupin.push(grupo)
          mitsubishi()
          
        }
        

function marcelinhoparaiba(x,telhado){
  let counter = 0
  let ixzi = 0
  var fim = []
  let count = 0
  var lis = []
  var tetoportas = []
  telhado.forEach((elemento) => {
    console.log(elemento)
    counter ++
    tetoportas.push(elemento)
    if(counter === 8){
      
      fim.push(tetoportas)
      console.log(fim)
      console.log(tetoportas)
      tetoportas = []
      counter = 0
    }
  })
  x.forEach((elemento) => {
    
    
    
    
    count ++;
    lis.push(elemento)
    console.log(elemento+ ',' + count);
    
    if (count === 11){

      lis.push(fim[ixzi])
      console.log(lis[11])
      count = 0
      
        
      
        
        
      
      const Walll = new THREE.BoxGeometry(lis[1],lis[2],.15);
      const Wallz = new THREE.BoxGeometry(.15,lis[2],lis[3])
      const cubeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(lis[9]) });
      const piso = new THREE.BoxGeometry(lis[1],lis[9],lis[3])
      const chao = new THREE.Mesh(piso, cubeMaterial)
      
      const wall1 = new THREE.Mesh(Walll, cubeMaterial);
      
      const wall2 = new THREE.Mesh(Walll, cubeMaterial);
      const wall3 = new THREE.Mesh(Wallz, cubeMaterial);
      const wall4 = new THREE.Mesh(Wallz, cubeMaterial);
      
      wall1.material.color.set(lis[10])
      wall2.material.color.set(lis[10])
      wall3.material.color.set(lis[10])
      wall4.material.color.set(lis[10])
      wall1.position.z = parseFloat(((lis[3]-.15)/2)+lis[6])
      wall2.position.z = parseFloat((-((lis[3]-.15)/2))+lis[6])
      wall3.position.x = parseFloat(((lis[1]-.15)/2)+lis[4])
      wall4.position.x = parseFloat((-((lis[1]-.15)/2))+lis[4])
      wall3.position.z = parseFloat(lis[6])
      wall4.position.z = parseFloat(lis[6])
      wall1.position.x = parseFloat(lis[4])
      wall2.position.x = parseFloat(lis[4])
      wall1.position.y = parseFloat(((lis[2]/2))-lis[5])
      wall2.position.y = parseFloat(((lis[2]/2))-lis[5])
      wall3.position.y = parseFloat(((lis[2]/2))-lis[5])
      wall4.position.y = parseFloat(((lis[2]/2))-lis[5])
      chao.position.y = parseFloat((((lis[2]-lis[2])))-lis[5])
      
      console.log(chao.position.y)
      chao.position.x = parseFloat(lis[4])
      chao.position.z = parseFloat(lis[6])
      if ( lis[11] !== undefined ){
        console.log('pomba')
        if(lis[11][4] === 'sim'){
          let teto =  new THREE.BoxGeometry(lis[11][1],lis[11][2],lis[11][3])
          let laje =  new THREE.Mesh(teto, new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(lis[11][7]) }))
          laje.position.y = parseFloat((((lis[2])))+lis[5])
        laje.position.x = parseFloat(lis[4])
        laje.position.z = parseFloat(lis[6])
        scene.add(laje)
        }
      }else{
        console.log('erro')
      }
      
      
      scene.add(wall1,wall2,wall3,wall4,chao);
      
      console.log(lis)
      lis = []
      ixzi ++
      
    }
    
  });
  


}

document.querySelector('#refresh').addEventListener('click',

mitsubishi
  
)



document.addEventListener('DOMContentLoaded',()=>{
  
})



document.querySelector('.push').addEventListener('click',()=>{
  //marcelinhoparaiba(grupin[0])
  const c = document.querySelector('.lista');
  c.classList.toggle('open')
})

console.log(grupin)
// Chama a função modifyJson com o caminho do arquivo específico


document.querySelector('.zone').addEventListener('click', function(){
  save.classList.toggle('close')
  up.classList.toggle('open')
  down.classList.toggle('open')
  document.querySelector('.zone').classList.toggle('switch')
})
down.addEventListener('click', ()=> {
  
  
  const file = 'dado.json';
  //modifyJson(file);
  let blocoz = new Object(); 
  let count = 0
  let zone = []
  let cool = []
  envia.forEach((elemento) => {
    count ++
    
    zone.push(elemento)
    if (count===11){
      console.log('para')
      let objectfinal = new Object();
      let objectd = new Object();
      let objectp = new Object();
      let objectpiso = new Object();
      let objectc = new Object();
      let objectm = new Object();
      objectd.dimensoes = [{x:zone[1]},{y:zone[2]},{z:zone[3]}]
      objectp.posicao = [{x:zone[4]},{y:zone[5]},{z:zone[6]}]
      objectpiso.piso = [{y:zone[7]},{espessura:zone[8]}]
      objectm.material=zone[9]
      objectc.cor = zone[10]
      
      
      objectfinal= [objectd,objectp,objectpiso,objectm,objectc]
      
      cool.push(({[zone[0]] : objectfinal}))
      console.log(JSON.stringify({[zone[0]] : objectfinal}))
      zone= []
      count = 0
    }

  })
  blocoz.blocos = cool
  console.log(blocoz)
  
  modificaebaixa(blocoz)
  save.classList.toggle('close')
  up.classList.toggle('open')
  down.classList.toggle('open')
  document.querySelector('.zone').classList.toggle('switch')
});
document.querySelector('#documento').addEventListener('change', function() {
  const file = this.files[0];
  const leitor = new FileReader();
  console.log(file)
  
  leitor.addEventListener('load', ()=> {
    console.log(leitor.result)
    final.push(leitor.result)
    
    let novi = (JSON.parse(leitor.result)['blocos'])
    novi.forEach((e) => {
      novogrupo.push(e)
    })
    let denovo = JSON.stringify({blocos:novogrupo})
    console.log(novogrupo)
    console.log({blocos:novogrupo})
    adiciona(denovo)

    marcelinhoparaiba(grupin[0],teto)
    mitsubishi()
    vou ++
    console.log(vou)
    if(vou  > 1){
      vou = 0
      

    }
    
    
  })
  if(file){
    leitor.readAsText(file)
    

  }
  

});



// Configuração da cena 3D
const scene = new THREE.Scene();
scene.background = new THREE.Color('gray');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const panel = document.querySelector('.painel');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(panel.clientWidth, panel.clientHeight);
panel.appendChild(renderer.domElement);
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('ufc-anao-fail.gif') });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function removin(s){
  while (s.children.length >0){
    const child = s.children[0];
    s.remove(child)
    // Certifique-se de liberar a memória das geometrias e materiais dos objetos removidos
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      // Se o objeto tiver um material com várias definições de materiais (por exemplo, MeshFaceMaterial),
      // você pode precisar iterar sobre os materiais e descartá-los individualmente.
      child.material.dispose();
    }
  }
  //marcelinhoparaiba(mudanca)
}

function mitsubishi(){
  mudanca.length = 0
  var counte = 0
  var cor = 1
  var coum = 0
  var corz = []
  var mate =[]
  var rol = []
  var rolo = []
  var ron = []
  
  var nimu = document.getElementsByClassName('titulo')
  var numeros = document.getElementsByClassName('intel')
  var cur = document.getElementsByClassName('corzinha')
  var materiol = document.getElementsByClassName('campo')
  for(var k = 0; k < (numeros.length); k++){
      
      
      
      
      
    counte++
    
    
    
      
      rolo.push(Number(numeros[k].value))
      if(counte === (8)){
        console.log(counte)
        
        console.log(rolo)
        ron.push(rolo)
        rolo = []
        counte = 0
      
        
      
      
      
      }
      
      
    
    

    
  }
  
  for(var ma = 0; ma < (materiol.length); ma++){
    
    if( materiol[ma].textContent === '' ){
      mate.push(materiol[ma].src)
      console.log(mate)
    }
    
  }

  for(var c = 0; c < (cur.length); c++){
    
    if(   cur[c].textContent === ''){
      corz.push((cur[c].value))
      console.log(corz)
      
    }
    
  }
  
  console.log(corz)
  console.log(mate)
  for(var i = 0 ; i < nimu.length; i++){
    
    mudanca.push(nimu[i].textContent)
    for (var m = 0; m < 8; m++){
      
      mudanca.push(ron[i][m])
      console.log(ron)
      
    }
    mudanca.push(mate[i])
    mudanca.push(corz[i])
    
    

  }
  
  console.log(mudanca)
  
  //marcelinhoparaiba(mudanca)
  removin(scene)
  marcelinhoparaiba(mudanca,teto)
  
  envia=mudanca
  
  
  console.log(envia)
  scene.add(cube);
  
}
document.querySelector('.crea').addEventListener('click', () => {
  createCube();
});

  
function createCube() {
  const x = (parseFloat(document.querySelector('#x').value) || 1)-.3;
  const y = parseFloat(document.querySelector('#y').value) || 1;
  const z = (parseFloat(document.querySelector('#z').value) || 1)-.3;
  const color = document.querySelector('#cor').value;
  
  console.log(texture.src)
  
  
  cube.material = new THREE.MeshBasicMaterial( {map:new THREE.TextureLoader().load(texture.src), color:color} );
  //cube.material.color.set(color);
  const newCubeGeometry = new THREE.BoxGeometry(x, y, z);
  
  cube.geometry.dispose();
  cube.geometry = newCubeGeometry;

  
}


camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};


animate();