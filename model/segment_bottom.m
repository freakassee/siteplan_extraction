% for n=0:10
%    top = imcrop(output_image,[margin_left+n*segmentW, margin_top, segmentW,segmentH]);
%     if ~isEmpty(top)
%         figure,imshow(top);
%         extractedSymbols= extractedSymbols+1;
%         warning(['top ' num2str(n+1)]);
%     end
% end
% for n=1:6
%     left = imcrop(output_image,[margin_left,margin_top+ n*segmentH, segmentW,segmentH]);
%       if ~isEmpty(left)
%         figure,imshow(left);
%         extractedSymbols= extractedSymbols+1;
%         warning(['left ' num2str(n)]);
%     end
% end
lengths = zeros(1,11);
for n=0:10

    newN = 10-n;
    
    xValue = n*segmentW;
    yValue = 7*segmentH+1/2*margin_top;
    
     bottom = imcrop(output_image,[xValue, yValue, segmentW+margin_left,segmentH+margin_top]);
%     bottom = imcrop(output_image,...
%         [margin_left-segmentW/24+newN*segmentW,...
%         height-segmentH+15, ...
%         segmentW+margin_left, ...
%         segmentH+margin_top]);
    
    [bool, nr,indexOfCategory]=isSymbol(bottom);
    
    xValues(n+18) = xValue-margin_left;
    yValues(n+18) = yValue-margin_top;
    isSymbolValues(n+18) = bool;
    catIndex_Values(n+18)=indexOfCategory;
    if bool
        
        if showImage 
            figure;imshow(bottom);
            extractedSymbols= extractedSymbols+1;
            warning(['bottom ' num2str(n+1)]);
        end
		 imwrite(bottom,[pathExtracted int2str(18+n) '.jpg']);
    else
        if extractAll
            imwrite(bottom,[pathExtracted int2str(18+n) '.jpg']);
       end
    end
lengths(1,newN+1) = nr;
end
% lengths
% for n=1:6 
%     right = imcrop(output_image,[width-segmentW,margin_top+ n*segmentH, segmentW,segmentH]);   
%    if ~isEmpty(right)
%         figure;imshow(right);
%         extractedSymbols= extractedSymbols+1;
%         warning(['right ' num2str(n)]);
%     end
% end
%end