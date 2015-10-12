function [isSymbol, indexOfCategory] = isSymbol(image)
    indexOfCategory = 0;
    %figure;imshow(image);
    isSymbol = true;
    [height, width, ~] = size(image);
    height  = height - 1;
    width   = width  - 1;
    cropped = imcrop(image, [1/3 * width, ...
                             5/12 * height, ...
                             1/3 * width, ...
                             1/5 * height]);
%     figure;imshow(cropped);
%      [1/3 * width, ...
%                              5/12 * height, ...
%                              1/3 * width, ...
%                              1/5 * height]
    gray = rgb2gray(cropped);
   
    [number_of_pixels, intensity_value] = imhist(gray);

    [peaks, positions] = findpeaks(number_of_pixels,intensity_value);
    
%    figure,imshow(cropped); 
%    figure,imhist(gray);
%    figure,findpeaks(number_of_pixels,intensity_value);
%    lengths = length(peaks)

    if length(peaks) <6
        isSymbol=false;

    else 
        if length(peaks) < 35 && length(peaks) > 5
        
        peaksAboveTresholdPercentage = length(find(peaks > 0.01 * max(peaks)));
        [~, posOfMaxPeak] = max(peaks);
        
        peaksInRangeTreshhold = length(...
            find(peaks(...
                positions >= positions(posOfMaxPeak) - 10 & ...
                positions <= positions(posOfMaxPeak) + 10 & ...
                positions ~= positions(posOfMaxPeak)) > 0.01 * max(peaks)));
        
        treshed = peaksAboveTresholdPercentage - peaksInRangeTreshhold
            if treshed < 5
                isSymbol = false;
            end
        end
    end
    if isSymbol
        index = 1;
        RGBPoints = zeros(8,3);
        x_values = zeros(8,1);
        y_values = zeros(8,1);
        [cropped_H,cropped_W,~] = size(cropped);
        for h=1:3
            yCoordinate = ceil(cropped_H*(h/4));
            for w = 1:3
                if h ~= 2
                xCoordinate = ceil(cropped_W*(2*w-1)/6);
                x_values(index) = xCoordinate;
                y_values(index) = yCoordinate;
              
                index= index + 1 ;
                else
                    if w ~=3
                        xCoordinate = ceil(cropped_W*(2*w)/6);
                        x_values(index) = xCoordinate;
                        y_values(index) = yCoordinate;
                        RGBPoints(index,:) = cropped(yCoordinate,xCoordinate,:);
                        index= index + 1 ;
                    end
                end  
            end
        end
      indexOfCategory= checkRGBValues(RGBPoints); 
    end
end

