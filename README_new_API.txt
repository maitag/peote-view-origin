------------------ API OOP-Style ---------------------------

peoteView = new PeoteView();
peoteView.render();
peoteView.start();
peoteView.stop();
peoteView.pause();
peoteView.time;

image = new Image();

texture = new Texture(512, 512, 10, ?ID);
-----------------------------------------
texture.w = 512;

texture.addImage(image, ?slot, ... );
Texture.addImage(texture.id, image, ?slot, ... );  //<--- static via ID


program = new Program( texture, fshader, vshader, ?ID );
--------------------------------------------------------
program.texture = texture;
program.fshader = fshader;
program.vshader = vshader;

program.set({ texture:t,... });
Program.set(p.id, {texture:t,...});    //<--- static via ID

------------- MACROS fuer buffer-types ---------------
enum TYPE { x; y; w; h;  }             <-- only this values will be reserved for gl-buffer

displaylist = new Displaylist<TYPE>( maxElements, ?ID);  
-------------------------------------------------------
displaylist.x = 4;
displaylist.y = 3;
displaylist.enable = true;

displaylist.set(      {x:4,y:3,...} );
Displaylist.set(d.id, {x:4,y:3,...} ); //<--- static via ID

displaylist.del();
Displaylist.del(d.id);                 //<--- static via ID



element = displaylist.addElement(program, ?textureslot, ?image, ?ID);
element = Displaylist.addElement(displaylist.id, program, ?textureslot, ?image, ?ID);   //<--- static via ID
--------------------------------------------------------------
element.x = 4;
element.y = 3;
element.update();

element.set({x:4,y:3,...});
Element.set(e.id, {x:4,y:3});       //<--- static via ID

element.del();
Element.del(element.id);            //<--- static via ID



