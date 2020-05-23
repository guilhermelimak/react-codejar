// Took from https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
export const getCaretOffset = (element: HTMLDivElement) => {
  let caretOffset = 0;
  const doc = element.ownerDocument || (element as any).document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type != "Control") {
    var textRange = sel.createRange();
    var preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
};

// Took from https://jsfiddle.net/nrx9yvw9/5/
const createRange = (
  el: ChildNode,
  chars: { count: number },
  range?: Range
): Range => {
  if (!range) {
    range = document.createRange();
    range.selectNode(el);
    range.setStart(el, 0);
  }

  if (chars.count === 0) {
    range.setEnd(el, chars.count);
  } else if (el && chars.count > 0) {
    if (el.nodeType === Node.TEXT_NODE) {
      if (el.textContent!.length < chars.count) {
        chars.count -= el.textContent!.length;
      } else {
        range.setEnd(el, chars.count);
        chars.count = 0;
      }
    } else {
      for (var i = 0; i < el.childNodes.length; i++) {
        range = createRange(el.childNodes[i], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  }

  return range;
};

export const setCurrentCursorPosition = (el: HTMLDivElement, chars: any) => {
  if (chars >= 0) {
    const selection = window.getSelection();

    const range = createRange(el, { count: chars });

    if (range) {
      range.collapse(false);
      selection!.removeAllRanges();
      selection!.addRange(range);
    }
  }
};
