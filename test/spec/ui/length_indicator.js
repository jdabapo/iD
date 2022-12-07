describe('iD.length_indicator',function() {
    var body, container, content, input, _lengthIndicator;
    var maxChars = 255;
    var data1 = 'foobar';
    var data2 = 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, integer gravida mauris, fringilla vehicula lacinia non';
    var data3 = data2 + data1;

    beforeEach(function() {
        body = d3.select('body');
        container = body.append('div').attr('class', 'ideditor');
        content = container.append('div');
        input = content.append('input');
        _lengthIndicator = iD.uiLengthIndicator(maxChars);
    });

    afterEach(function() {
        body.selectAll('._lengthIndicator').remove();
        content.remove();
        container.remove();
    });

    // it('if value is less than maxChars',function(){
    //     input.call(_lengthIndicator.update(data1));
    //     // focusTypeahead(input);
    // });

    // it ('if value is equal to maxChars',function(){
    //     input.call(_lengthIndicator.update(data2));
    // });

    // it ('if value is more than maxChars',function(){
    //     input.call(_lengthIndicator.update(data3));
    // });

    // it ('if silent is activated',function() {
    //     input.call(_lengthIndicator.silent(true));
    //     input.call(_lengthIndicator.update(data1));
    //     expect(body.selectAll('._lengthIndicator').size()).to.equal(0);
    //     input.call(_lengthIndicator.silent(false));
    //     input.call(_lengthIndicator.update(data1));
    //     expect(body.selectAll('._lengthIndicator').size()).to.equal('foobar');

    // });
});