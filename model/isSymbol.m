function [bool, lengths] = isSymbol(image)
    
    bool = true;
    [height, width, ~] = size(image);
    height  = height - 1;
    width   = width  - 1;
    cropped = imcrop(image, [3/8 * width, ...
                             5/12 * height, ...
                             1/4 * width, ...
                             1/5 * height]);
%     figure;imshow(cropped);
    gray = rgb2gray(cropped);
    [countsGray, xGray] = imhist(gray);

    [peaks, pos] = findpeaks(countsGray,xGray);

    lengths = length(peaks);

    if length(peaks) <= 5
        bool=false;

    else
        if length(peaks) < 35 && length(peaks) > 5
        
        peaksAboveTresholdPercentage = length(find(peaks > 0.01 * max(peaks)));
        [~, posOfMaxPeak] = max(peaks);
        
        peaksInRangeTreshhold = length(...
            find(peaks(...
                pos >= pos(posOfMaxPeak) - 10 & ...
                pos <= pos(posOfMaxPeak) + 10 & ...
                pos ~= pos(posOfMaxPeak)) > 0.01 * max(peaks)));
        
        treshed = peaksAboveTresholdPercentage - peaksInRangeTreshhold;
            if treshed <= 5
                bool = false;
            end
        end
end