/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o        o    o-o   
 *     o      o     (o)    o      o  
 *    o      o-o    / \     o    o-o 
 * 
 * PEOTE VIEW - haxe 2D OpenGL Render Library
 * Copyright (c) 2014 Sylvio Sell, http://maitag.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package de.peote.tools;

// this cheese holds all its holes "together?"
class Holes // amount of manysized cheese-holes may grow up (memory-consume-temple.. ;)=
{
	public var hole:Array<Hole>;
	public var size:Int;
	
	public inline function new(size:Int)
	{
		this.size = size-1;
		hole = new Array<Hole>();
		hole.push(new Hole(0));
		hole[0].end = this.size;
		//trace("new hole[0].start="+hole[0].start+"  hole[0].end="+hole[0].end);
	}
	
	public function addHole(pos:Int):Void
	{
		// TODO: optimize with haxe sugar
		for (i in 0...hole.length)
		{	//trace("addHoleLoop i="+i+" start:"+hole[i].start+" end:"+hole[i].end);
			if ( pos + 1 == hole[i].start)
			{	//trace("A");
				hole[i].start--;
				if (i > 0)
				{
					if (hole[i].start == hole[i-1].end +1)
					{
						hole[i].start = hole[i-1].start;
						// join Array i and i-1
						hole.splice(i - 1, 1);
					}
				}
				//trace("addHole: if (pos + 1 == hole[i].start):" + hole);
				return;
			}
			else if ( pos == hole[i].end + 1)
			{	
				hole[i].end++;
				//trace("B");
				if (i < hole.length-1)
				{
					if (hole[i].end == hole[i+1].start -1)
					{	
						hole[i+1].start = hole[i].start;
						// join Array i and i-1
						hole.splice(i,1);
					}
				}
				//trace("addHole: if ( pos == hole[i].end + 1):" + hole);
				return;	
			}
			else if ( pos < hole[i].start)
			{	//trace("C");
				hole.insert(i, new Hole(pos));
				//trace("addHole: if ( pos < hole[i].start):" + hole);
				return;
			}
			
		} // end for
		hole.push(new Hole(pos)); // only if not inserted
		//trace("addHole push:" + hole);
	}
	
	public function getHole():Int
	{
		var mid:Int = Math.floor(hole.length / 2);
		if (hole[mid].start == hole[mid].end)
		{	
			//trace("getHole: hole["+mid+"].start == hole["+mid+"].end" + hole);
			return(hole.splice(mid,1)[0].start);
		}
		//trace("getHole: mid="+mid+" "+ hole);
		return(hole[mid].start++);
	}
	
	public inline function first():Int
	{
		if (hole.length > 0)
		{	
			if (hole[0].start == 0 )
				return(hole[0].end+1);
			else return(0);
		}
		else return(0);
	}
	
	public inline function last():Int
	{
		if (hole.length > 0)
		{	
			if (hole[hole.length - 1].end == size )
				return(hole[hole.length-1].start-1);
			else	
				return(size);
		}
		else return(size);
	}
	
	public inline function is_full():Bool
	{
		return(hole.length == 0);
	}
	
	public inline function is_empty():Bool
	{
		var it_is:Bool = false;
		//trace("is_empty() : hole[0].start="+hole[0].start+"  hole[0].end="+hole[0].end);
		if (hole.length == 1)
		{	//trace("hole[0].start="+hole[0].start+"  hole[0].end="+hole[0].end);
			if (hole[0].start == 0 && hole[0].end == size) it_is = true;
		}
		return it_is;
	}
	
}

class Hole
{
	public var start:Int;
	public var end:Int;
	public inline function new(start:Int)
	{
		this.start = start;
		end = start;
	}
}
