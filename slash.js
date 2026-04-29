/*  slash.js javascript library version 0.1
 *  (c) 2008 hiromi hishida 
 *
 *  slash.js is freely distributable under the terms of an MIT-style license.
 *  For further details, please visit my website: http://www.77-web.com/slashjs/
 *  Or you can contact me directly: info at 77-web.com
 *
 *--------------------------------------------------------------------------*/


Event.observe(window, "load", initSlash);

function initSlash()
{
  var tds = $$("td.withSlash");
  for(var i= 0;i<tds.length;i++)
  {
    if(Element.hasClassName(tds[i], "slashRight"))
    {
      drawSlash(tds[i], "right");
    }
    else
    {
      drawSlash(tds[i], "left");
    }
  }
}

function drawSlash(td, align)
{
  var x = Element.getWidth(td)-2;
  var y = Element.getHeight(td);
  
  var a = x/y;
  
  var tbody = Element.extend(document.createElement("tbody"));
  
  var p = 0;
  var jmax = 0;
  var tr = "";
  var fore = "";
  var back = "";
  var dot = "";
  for(p=1;p<y;p++)
  {
    if(align=="right")
    {
      jmax = x - a*p;
    }
    else
    {
      jmax = a*p;
    }
    jmax = parseInt(jmax,10);
    
    tr = Element.extend(document.createElement("tr"));
    
    if(jmax-1>0)
    {
      fore = Element.extend(document.createElement("td"));
      Element.writeAttribute(fore, "colspan", jmax-1);
      Element.insert(tr, { bottom:fore });
    }
    
    dot = document.createElement("td");
    Element.addClassName(dot, "slash");
    Element.insert(tr, { bottom:dot });

    if(x-jmax>0)
    {
      back = Element.extend(document.createElement("td"));
      Element.writeAttribute(back, "colspan", x-jmax);
      Element.insert(tr, { bottom:back });
    }

    Element.insert(tbody, { bottom:tr });
    
  }

  Element.setStyle(td, { 'padding':'0px' });

  var table = Element.extend(document.createElement("table"));
  Element.writeAttribute(table, "cellspacing", "0");
  Element.writeAttribute(table, "cellpadding", "0");
  Element.writeAttribute(table, "width", x + "px");
  Element.addClassName(table, "slashTable");
  Element.update(table, tbody);

  Element.update(td, table);
}