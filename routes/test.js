let aaa = [  [{a:1,b:2,c:3},{d:1,e:2,f:3},{g:1,h:2,j:3}], 
             [{aa:1,bb:2,cc:3},{dd:1,ee:2,ff:3},{gg:1,hh:2,jj:3}]
          ];

let aaa1 = [  ['1', '2'], 
    ['3', '4']
];

console.log(aaa.map(
    bb=>{
       return bb.join();
    }
));

console.log(aaa1.map(
    bb=>{
       return bb.join();
    }
));
