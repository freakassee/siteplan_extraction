

% for n=6
lengths = zeros(1,11);
for n=0:10
   xValue = n*segmentW;
   yValue = 0;
  
  
   top = imcrop(output_image,[xValue, yValue, segmentW+margin_left,segmentH+margin_top]);
   
   [bool, nr]=isSymbol(top);
   
   xValues(n+1) = xValue-margin_left;
   yValues(n+1) = yValue-1/2*margin_top;
   isSymbolValues(n+1)=bool;
   
    if ~bool
        if showImage    
        figure,imshow(top);
        extractedSymbols= extractedSymbols+1;
        warning(['top ' num2str(n+1)]);
        end
		imwrite(top,[pathExtracted int2str(n+1) '.jpg']);
        
    else
        if extractAll
            imwrite(top,[pathExtracted int2str(n+1) '.jpg']);
        end
    end
lengths(1,n+1) =nr;
end
% lengths
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
% for n=1:6 
%     right = imcrop(output_image,[width-segmentW,margin_top+ n*segmentH, segmentW,segmentH]);   
%    if ~isEmpty(right)
%         figure;imshow(right);
%         extractedSymbols= extractedSymbols+1;
%         warning(['right ' num2str(n)]);
%     end
% end
%end