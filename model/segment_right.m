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
% for n=0:10
%     bottom = imcrop(output_image,[margin_left-segmentW/24+n*segmentW, height-segmentH+15, segmentW,segmentH]);  
%     if ~isEmpty(bottom)
%         figure;imshow(bottom);
%         extractedSymbols= extractedSymbols+1;
%         warning(['bottom ' num2str(n+1)]);
%     end    
% end
lengths = zeros(6,1);
for n=1:6
    
    xValue = 10*segmentW;
    yValue = n*segmentH+1/2*margin_top;
  
    
    right = imcrop(output_image,[xValue,yValue, segmentW+margin_left,segmentH+margin_top]);   
	[bool nr]=isSymbol(right);

    xValues(n+11) = xValue-margin_left;
    yValues(n+11) = yValue-1/2*margin_top;
    isSymbolValues(n+11) = bool;

    if ~bool
        if showImage 
            figure;imshow(right);
            extractedSymbols= extractedSymbols+1;
            warning(['right ' num2str(n)]);
        end
        imwrite(right,[pathExtracted int2str(11+n) '.jpg']);
    else
        if extractAll
            imwrite(right,[pathExtracted int2str(11+n) '.jpg']);
        end   
    end
    lengths(n,1) =nr;
end
% lengths
%end