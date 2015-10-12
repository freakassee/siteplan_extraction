
for n=0:10

    newN = 10-n;
    
    xValue = n*segmentW;
    yValue = 7*segmentH+1/2*margin_top;
    
     bottom = imcrop(output_image,[xValue, yValue, segmentW+margin_left,segmentH+margin_top]);

    
    [bool, indexOfCategory]=isSymbol(bottom);
    
    xValues(n+18) = xValue-margin_left;
    yValues(n+18) = yValue-margin_top;
    isSymbolValues(n+18) = bool;
    catIndex_Values(n+18)=indexOfCategory;
    
  
    imwrite(bottom,[pathExtracted int2str(n+18) '.jpg']);
    
    if bool
        
        if showImage 
            figure;imshow(bottom);
            extractedSymbols= extractedSymbols+1;
            warning(['bottom ' num2str(n+1)]);
        end
		 imwrite(bottom,[pathExtractedSymbol int2str(18+n) '.jpg']);
    else
        if extractAll
            imwrite(bottom,[pathExtractedEmpty int2str(18+n) '.jpg']);
       end
    end
end
