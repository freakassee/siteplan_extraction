

for n=1:6
    newN=7-n;
    
    xValue = 0;
    yValue = n*segmentH+1/2*margin_top;
        
    left = imcrop(output_image,[xValue, yValue, segmentW + margin_left, segmentH + margin_top]);
    
    [bool, indexOfCategory] = isSymbol(left);
    
    xValues(28+n) = xValue-margin_left;
    yValues(28+n) = yValue-margin_top;
    isSymbolValues(28+n) = bool;
    catIndex_Values(28+n)=indexOfCategory;
    

    imwrite(left,[pathExtracted int2str(n+28) '.jpg']);
     
    if bool
        indexOfCategory
        if showImage
            figure,imshow(left);
            extractedSymbols= extractedSymbols+1;
            warning(['left ' num2str(n)]);
        end
        imwrite(left,[pathExtractedSymbol int2str(28+n) '.jpg']);
    else
        if extractAll
            imwrite(left,[pathExtractedEmpty int2str(28+n) '.jpg']);
        end
    end
end
