% for n=0:10
%    top = imcrop(output_image,[margin_left+n*segmentW, margin_top, segmentW,segmentH]);
%     if ~isEmpty(top)
%         figure,imshow(top);
%         extractedSymbols= extractedSymbols+1;
%         warning(['top ' num2str(n+1)]);
%     end
% end
lengths = zeros(6,1);
for n=1:6
    newN=7-n;
    
    xValue = 0;
    yValue = n*segmentH+1/2*margin_top;
        
    left = imcrop(output_image,[xValue, yValue, segmentW + margin_left, segmentH + margin_top]);
    
    [bool, nr,indexOfCategory] = isSymbol(left);
    
    xValues(28+n) = xValue-margin_left;
    yValues(28+n) = yValue-margin_top;
    isSymbolValues(28+n) = bool;
     catIndex_Values(28+n)=indexOfCategory;
    
    if bool
        indexOfCategory
        if showImage
            figure,imshow(left);
            extractedSymbols= extractedSymbols+1;
            warning(['left ' num2str(n)]);
        end
        imwrite(left,[pathExtracted int2str(28+n) '.jpg']);
    else
        if extractAll
            imwrite(left,[pathExtracted int2str(28+n) '.jpg']);
        end
    end
    lengths(newN,1) =nr;
end
% lengths
% for n=0:10
%     bottom = imcrop(output_image,[margin_left-segmentW/24+n*segmentW, height-segmentH+15, segmentW,segmentH]);
%     if ~isEmpty(bottom)
%         figure;imshow(bottom);
%         extractedSymbols= extractedSymbols+1;
%         warning(['bottom ' num2str(n+1)]);
%     end
% end
% for n=1:6
%     right = imcrop(output_image,[width-segmentW,margin_top+ n*segmentH, segmentW,segmentH]);
%    if ~isEmpty(right)
%         figure;imshow(right);
%         extractedSymbols= extractedSymbols+1;
%         warning(['right ' num2str(n)]);
%     end
% end
%end