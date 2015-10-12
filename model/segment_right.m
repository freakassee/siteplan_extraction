
for n=1:6
    
    xValue = 10*segmentW;
    yValue = n*segmentH+1/2*margin_top;
  
    
    right = imcrop(output_image,[xValue,yValue, segmentW+margin_left,segmentH+margin_top]);   
	[bool, indexOfCategory]=isSymbol(right);

    xValues(n+11) = xValue-margin_left;
    yValues(n+11) = yValue-margin_top;
    isSymbolValues(n+11) = bool;
    catIndex_Values(n+11)=indexOfCategory;
    
    imwrite(right,[pathExtracted int2str(n+11) '.jpg']);
    
    
    if bool
        indexOfCategory
        if showImage 
            figure;imshow(right);
            extractedSymbols= extractedSymbols+1;
            warning(['right ' num2str(n)]);
        end
        imwrite(right,[pathExtractedSymbol int2str(11+n) '.jpg']);
    else
        if extractAll
            imwrite(right,[pathExtractedEmpty int2str(11+n) '.jpg']);
        end   
    end
    
end











