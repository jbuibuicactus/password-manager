/*

Copyright 2008-2013 Clipperz Srl

This file is part of Clipperz, the online password manager.
For further information about its features and functionalities please
refer to http://www.clipperz.com.

* Clipperz is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or 
  (at your option) any later version.

* Clipperz is distributed in the hope that it will be useful, but 
  WITHOUT ANY WARRANTY; without even the implied warranty of 
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

* You should have received a copy of the GNU Affero General Public
  License along with Clipperz. If not, see http://www.gnu.org/licenses/.

*/

/***

MochiKit.MockDOM 1.5

See <http://mochikit.com/> for documentation, downloads, license, etc.

(c) 2005 Bob Ippolito.  All rights Reserved.

***/

var MochiKit = MochiKit || {};

MochiKit.MockDOM = MochiKit.MockDOM || {};

MochiKit.MockDOM.NAME = "MochiKit.MockDOM";
MochiKit.MockDOM.VERSION = "1.5";
MochiKit.MockDOM.__export__ = false;

MochiKit.MockDOM.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

/** @id MochiKit.MockDOM.toString */
MochiKit.MockDOM.toString = function () {
    return this.__repr__();
};

/** @id MochiKit.MockDOM.createDocument */
MochiKit.MockDOM.createDocument = function () {
    var doc = new MochiKit.MockDOM.MockElement("DOCUMENT");
    doc.body = doc.createElement("BODY");
    doc.appendChild(doc.body);
    return doc;
};

/** @id MochiKit.MockDOM.MockElement */
MochiKit.MockDOM.MockElement = function (name, data, ownerDocument) {
    this.tagName = this.nodeName = name.toUpperCase();
    this.ownerDocument = ownerDocument || null;
    if (name == "DOCUMENT") {
        this.nodeType = 9;
        this.childNodes = [];
    } else if (typeof(data) == "string") {
        this.nodeValue = data;
        this.nodeType = 3;
    } else {
        this.nodeType = 1;
        this.childNodes = [];
    }
    if (name.substring(0, 1) == "<") {
        var nameattr = name.substring(
            name.indexOf('"') + 1, name.lastIndexOf('"'));
        name = name.substring(1, name.indexOf(" "));
        this.tagName = this.nodeName = name.toUpperCase();
        this.setAttribute("name", nameattr);
    }
};

MochiKit.MockDOM.MockElement.prototype = {
    /** @id MochiKit.MockDOM.MockElement.prototype.createElement */
    createElement: function (tagName) {
        return new MochiKit.MockDOM.MockElement(tagName, null, this.nodeType == 9 ? this : this.ownerDocument);
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.createTextNode */
    createTextNode: function (text) {
        return new MochiKit.MockDOM.MockElement("text", text, this.nodeType == 9 ? this : this.ownerDocument);
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.setAttribute */
    setAttribute: function (name, value) {
        this[name] = value;
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.getAttribute */
    getAttribute: function (name) {
        return this[name];
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.appendChild */
    appendChild: function (child) {
        this.childNodes.push(child);
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.toString */
    toString: function () {
        return "MockElement(" + this.tagName + ")";
    },
    /** @id MochiKit.MockDOM.MockElement.prototype.getElementsByTagName */
    getElementsByTagName: function (tagName) {
        var foundElements = [];
        MochiKit.Base.nodeWalk(this, function(node){
            if (tagName == '*' || tagName == node.tagName) {
                foundElements.push(node);
                return node.childNodes;
            }
        });
        return foundElements;
    }
};

    /** @id MochiKit.MockDOM.EXPORT_OK */
MochiKit.MockDOM.EXPORT_OK = [
    "mockElement",
    "createDocument"
];

    /** @id MochiKit.MockDOM.EXPORT */
MochiKit.MockDOM.EXPORT = [
    "document"
];

MochiKit.MockDOM.__new__ = function () {
    this.document = this.createDocument();
};

MochiKit.MockDOM.__new__();