

lengths = zeros(1,11);
 for n=0:10
   xValue = n*segmentW;
   yValue = 0;
  
  
   top = imcrop(output_image,[xValue, yValue, segmentW+margin_left,segmentH+margin_top]);
   
   [bool, indexOfCategory]=isSymbol(top);
   
   
   xValues(n+1) = xValue-margin_left;
   yValues(n+1) = yValue-1/2*margin_top;
   isSymbolValues(n+1)=bool;
   catIndex_Values(n+1)=indexOfCategory;
   

    imwrite(top,[pathExtracted int2str(n+1) '.jpg']);
    
    if bool
       
        if showImage    
        figure,imshow(top);
        extractedSymbols= extractedSymbols+1;
        warning(['top ' num2str(n+1)]);
        end
		imwrite(top,[pathExtractedSymbol int2str(n+1) '.jpg']);
        
    else
        if extractAll
            imwrite(top,[pathExtractedEmpty int2str(n+1) '.jpg']);
        end
    end
 end