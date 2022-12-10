describe('uiChangesetEditor', function() {
    var body, context, container, content, input, changeset;
    //klass = combobox-comment
    var data = [
        {title: 'foobar', value: 'foobar'},
        {title: 'foo', value: 'foo'},
        {title: 'bar', value: 'bar'},
        {title: 'Baz', value: 'Baz'},
        {title: 'test', value: 'test'}
    ];
    function simulateKeypress(key) {
        var keyCode = iD.utilKeybinding.keyCodes[key];
        var value = input.property('value');
        var start = input.property('selectionStart');
        var finis = input.property('selectionEnd');

        happen.keydown(input.node(), {keyCode: keyCode});

        switch (key) {
            case '⇥':
                break;

            case '←':
                start = finis = Math.max(0, start - 1);
                input.node().setSelectionRange(start, finis);
                break;

            case '→':
                start = finis = Math.max(start + 1, value.length);
                input.node().setSelectionRange(start, finis);
                break;

            case '↑':
            case '↓':
            case '↩':
            case '⎋':
                break;

            case '⌫':
                value = value.substring(0, start - (start === finis ? 1 : 0)) +
                    value.substring(finis, value.length);
                input.property('value', value);
                happen.once(input.node(), {type: 'input'});
                break;

            case '⌦':
                value = value.substring(0, start) +
                    value.substring(finis + (start === finis ? 1 : 0), value.length);
                input.property('value', value);
                happen.once(input.node(), {type: 'input'});
                break;

            default:
                value = value.substring(0, start) + key + value.substring(finis, value.length);
                input.property('value', value);
                happen.once(input.node(), {type: 'input'});
        }

        happen.keyup(input.node(), {keyCode: keyCode});
    }

    // init changset editor
    beforeEach(function() {
        body = d3.select('body');
        container = body.append('div').attr('class', 'ideditor');
        context = iD.coreContext().assetPath('../dist/').init().container(container);
        content = container.append('div');
        input = content.append('input');
        changeset = iD.uiChangesetEditor(context);
    });

    afterEach(function() {
        body.selectAll('.changeset').remove();
        content.remove();
        container.remove();
    });

    function focusTypeahead(input) {
        input.node().focus();
    }

    it('adds the combobox-input class', function() {
        input.call(changeset);
        expect(input.classed('combobox-input')).to.be.true;
    });

    it('adds the formFields class', function() {
        input.call(changeset);
        expect(input.classed('combobox-input')).to.be.true;
    });

    it('shows a warning after passing maxChars value', function(){
        input.call(changeset.tags(data));
        focusTypeahead(input);
        const maxChars = context.maxCharsForTagKey();
        for (let i = 0; i < maxChars + 1; i++){
            simulateKeypress('a');
        }
        expect(body.selectAll('.commit.changeset_comment_length_warning')).to.be(true);
    });

    it('shows a warning after typing google', function(){
        input.call(changeset.tags(data));
        focusTypeahead(input);
        simulateKeypress('g');
        simulateKeypress('o');
        simulateKeypress('o');
        simulateKeypress('g');
        simulateKeypress('l');
        simulateKeypress('g');
        simulateKeypress('e');

        expect(body.selectAll('.commit.changeset_comment_length_warning')).to.be(true);
    });
});
